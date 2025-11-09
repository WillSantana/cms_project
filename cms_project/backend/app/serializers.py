from rest_framework import serializers
from .models import Concurso, Area


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ("id", "nome")


class ConcursoSerializer(serializers.ModelSerializer):
    area = AreaSerializer(read_only=True)
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(),
        source="area",
        write_only=True,
        required=False,
        allow_null=True
    )
    status = serializers.CharField(source="status", read_only=True)

    class Meta:
        model = Concurso
        fields = [
            "id", "titulo", "numero_edital", "orgao", "cargo", "numero_vagas",
            "requisitos", "local_atuacao", "remuneracao",
            "data_publicacao", "inicio_inscricoes", "fim_inscricoes", "data_prova",
            "prazo_recursos", "previsao_resultado",
            "edital_pdf", "formulario", "modelo_documento",
            "situacao_manual",
            "area", "area_id",
            "criado_por", "criado_em", "atualizado_em", "ativo",
            "status",
        ]
        read_only_fields = ("criado_por", "criado_em", "atualizado_em")
