
from django.contrib.auth.models import User, Group
from app.models import Area

areas = [
    "Educação",
    "Saúde",
    "Assistência Social",
    "Administração",
    "Obras e Infraestrutura",
    "Procuradoria Jurídica",
    "Meio Ambiente",
    "Planejamento",
    "Trânsito e Transporte",
]

for nome in areas:
    area_obj, _ = Area.objects.get_or_create(nome=nome)
    grupo_obj, _ = Group.objects.get_or_create(name=nome)

    username = (
        nome.lower()
        .replace(" ", "_")
        .replace("ã","a").replace("â","a")
        .replace("é","e").replace("ê","e")
        .replace("ç","c")
        .replace("í","i")
        .replace("ó","o").replace("õ","o")
    )

    email = f"{username}@prefeitura.local"
    senha = "123456"

    user, created = User.objects.get_or_create(username=username, defaults={"email": email})

    if created:
        user.set_password(senha)
        user.save()

    user.groups.clear()
    user.groups.add(grupo_obj)

    print(f"✅ {nome} -> usuário: {username}  senha: {senha}")

print("\n🎯 Finalizado: áreas, grupos e usuários criados!\n")
