### 1. Abro carpeta con terminal

### 2. Creo proyecto con supabase integrado y asigno nombre:

```
npx create-next-app@latest -e with-supabase ejemplo
```

### 3. Abro proyecto con Windsurf

### 4. Creo repositorio github, commit y push

### 5. Creo rama develop:

```
git checkout -b develop
```

### 6. Corro proyecto y lo veo en localhost:3000

```
npm run dev
```

### 7. Creo proyecto supabase y agrego contraseña BD 

- Obtengo URL y Anon Public

### 8. Cambio nombre a archivo .env.local y las agrego:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 9. Detengo el servidor y lo vuelvo a correr:

```
ctrl + c
```

```
npm run dev
```

### 10. Presiono boton sign up o me dirigjo a ruta:

```
http://localhost:3000/sign-up
````

### 11. Ingreso correo, creo una contraseña y clic en boton sign up

- Me aparece mensaje que se envió link al correo

### 12. Reviso bandeja de entrada y confirmo link

- El servidor local debe estar corriendo

### 13. Me aparece saludo a correo y ruta protected

### 14. Dentro del proyecto en Supabase voy a Autenthication

- Aparece el usuario registrado

### 15. Configuro para deploy (desde develop)

```
git fetch origin
```

### 16. Cambio de rama

```
git checkout main
```

### 17. Actualizo remoto

```
git pull origin main
```

### 18. Merge develop --> main

```
git merge develop --no-edit
```

### 19. Subo cambios

```
git push origin main
```

### 20. Hago despliegue local:

```
npm run build
```

- Se crea carpeta .next










