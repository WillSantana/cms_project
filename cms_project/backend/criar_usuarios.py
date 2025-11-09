sudo docker compose exec backend python manage.py shell << 'EOF'
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
    username = (
        nome.lower()
        .replace(" ", "_")
        .replace("ã", "a")
        .replace("ç", "c")
        .replace("é", "e")
        .replace("í", "i")
    )
    email = f"{username}@prefeitura.local"
    senha = "123456"
    
    user, created = User.objects.get_or_create(username=username, defaults={"email": email})
    
    if created:
        user.set_password(senha)
        user.save()
        print(f"✅ Criado: {username}")
    else:
        print(f"ℹ️ Já existia: {username}")
    
    g = Group.objects.get(name=nome)
    user.groups.clear()
    user.groups.add(g)

print("\n✅ Finalizado com sucesso!")
EOF
