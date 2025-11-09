from django.db import models
from django.contrib.auth import get_user_model
from datetime import date

User = get_user_model()


class Area(models.Model):
    """
    Áreas / grupos (Ex.: Educação, Saúde, Administração).
    """
    nome = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Área"
        verbose_name_plural = "Áreas"

    def __str__(self) -> str:
        return self.nome


class Concurso(models.Model):
    """
    Modelo principal para concursos/processos seletivos.
    Possui status automático e campo de situação manual que sobrepõe.
    """
    # Informações básicas
    titulo = models.CharField("Título do Concurso", max_length=255)
    numero_edital = models.CharField("Número do Edital", max_length=100, blank=True, null=True)
    orgao = models.CharField("Órgão/Entidade Responsável", max_length=255)
    cargo = models.CharField("Cargo/Área de Atuação", max_length=255)
    numero_vagas = models.PositiveIntegerField("Número de Vagas", default=1)
    requisitos = models.TextField("Requisitos Básicos", blank=True, null=True)
    local_atuacao = models.CharField("Local de Atuação", max_length=255, blank=True, null=True)
    remuneracao = models.DecimalField("Remuneração (R$)", max_digits=10, decimal_places=2, blank=True, null=True)

    # Períodos importantes
    data_publicacao = models.DateField("Data de Publicação", blank=True, null=True)
    inicio_inscricoes = models.DateField("Início das Inscrições", blank=True, null=True)
    fim_inscricoes = models.DateField("Término das Inscrições", blank=True, null=True)
    data_prova = models.DateField("Data da Prova", blank=True, null=True)
    prazo_recursos = models.DateField("Prazo para Recursos", blank=True, null=True)
    previsao_resultado = models.DateField("Previsão de Resultado", blank=True, null=True)

    # Documentação (se preferir guardar no CmsMedia, pode usar ForeignKey para modelo de mídia)
    edital_pdf = models.FileField("Edital Completo (PDF)", upload_to="editais/", blank=True, null=True)
    formulario = models.FileField("Formulário de Inscrição", upload_to="formularios/", blank=True, null=True)
    modelo_documento = models.FileField("Modelo de Documento", upload_to="modelos/", blank=True, null=True)

    # Situação manual (sobrepõe status automático)
    SITUACAO_MANUAL_CHOICES = [
        ("", "— Automático —"),
        ("SUSPENSO", "Suspenso"),
        ("CANCELADO", "Cancelado"),
        ("PRORROGADO", "Prorrogado"),
        ("ADIADO", "Adiado"),
        ("FINALIZADO", "Finalizado"),
    ]
    situacao_manual = models.CharField(
        "Situação Manual",
        max_length=20,
        choices=SITUACAO_MANUAL_CHOICES,
        blank=True,
        default="",
        help_text="Se definido, substitui o status automático calculado pelas datas."
    )

    # Controle e acesso
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, related_name="concursos")
    criado_por = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="concursos_criados")
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Concurso / Processo Seletivo"
        verbose_name_plural = "Concursos e Processos Seletivos"
        ordering = ["-data_publicacao", "titulo"]

    def __str__(self) -> str:
        return f"{self.titulo} ({self.orgao})"

    def pode_visualizar(self, usuario) -> bool:
        """
        Retorna True se o usuário puder ver este concurso.
        - Superusuário vê tudo.
        - Usuário comum só vê concursos da sua área/grupo.
        """
        if usuario.is_superuser:
            return True

        grupos = usuario.groups.values_list("name", flat=True)
        if self.area and self.area.nome in grupos:
            return True

        return False

    @property
    def status(self) -> str:
        """
        Retorna o status atual (prioriza situacao_manual).
        """
        if self.situacao_manual:
            return self.get_situacao_manual_display()

        hoje = date.today()

        if not self.data_publicacao:
            return "Aguardando Publicação"

        # Se houver período de inscrições definido
        if self.inicio_inscricoes and self.fim_inscricoes:
            if self.inicio_inscricoes <= hoje <= self.fim_inscricoes:
                return "Inscrições Abertas"
            elif hoje < self.inicio_inscricoes:
                return "Inscrições Não Iniciadas"
            else:  # hoje > fim_inscricoes
                if self.data_prova:
                    if hoje < self.data_prova:
                        return "Inscrições Encerradas"
                    else:  # hoje >= data_prova
                        if self.previsao_resultado and hoje >= self.previsao_resultado:
                            return "Resultado Divulgado"
                        return "Prova Realizada"
        # Se só existir data_prova
        if self.data_prova:
            if hoje < self.data_prova:
                return "Aguardando Prova"
            else:
                return "Prova Realizada"

        return "Encerrado"
