import json
from django.core.management.base import BaseCommand
from app.models import Concurso, Documento, Link


class Command(BaseCommand):
    help = "Importa concursos do JSON"

    def handle(self, *args, **kwargs):
        with open("processos.json", encoding="utf-8") as f:
            data = json.load(f)

        for item in data:
            # pega o status do JSON
            status_json = item.get("status", "")

            concurso, created = Concurso.objects.update_or_create(
                id=item["id"],
                defaults={
                    "titulo": item["titulo"],
                    "cargo": item["cargo"],
                    "orgao": item["orgao"],
                    "numEdital": item.get("numEdital"),
                    "telefone": item.get("telefone"),
                    "email": item.get("email"),
                    # status do JSON vira situação manual (se informado)
                    "situacao_manual": status_json if status_json else "",
                },
            )

            # limpa documentos existes antes de recriar
            concurso.documentos.all().delete()

            for d in item.get("documentos", []):
                doc = Documento.objects.create(concurso=concurso, titulo=d["titulo"])

                for link in d.get("links", []):
                    Link.objects.create(documento=doc, label=link["label"], url=link["url"])

        print("✅ Importação concluída")
