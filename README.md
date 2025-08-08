# 💳 Sistema de Gestión de Créditos

## 📌 Nombre del Proyecto
**Sistema de Gestión de Créditos - RapiCréditos**

## 📝 Descripción

Este sistema tiene como objetivo gestionar de manera integral los créditos otorgados por una entidad financiera o cooperativa. Está dividido en dos niveles de uso: **nivel negocio**, orientado a empleados de la empresa, y **nivel cliente**, donde los usuarios pueden gestionar sus solicitudes de crédito. El sistema permite registrar y administrar usuarios con distintos roles, gestionar solicitudes de crédito, controlar el estado de los pagos, y generar informes de cartera y cobros.

### ✨ Funcionalidades Principales

#### Nivel Negocio:
- Gestión de usuarios con rol de Administrador.
- Registro, modificación y eliminación de cuentas de usuario.
- Recuperación de contraseña con sistema hash.
- Evaluación crediticia mediante integración con la API del Banco Central.
- Gestión del proceso completo de solicitud, aprobación y firma de contratos.

#### Nivel Cliente:
- Activación y acceso a cuentas de clientes.
- Solicitud y seguimiento de créditos.
- Recuperación y modificación de contraseña.
- Visualización de estado de créditos y pagos.

#### Administración de Créditos:
- Almacenamiento y evaluación de solicitudes.
- Generación de contratos.
- Seguimiento de pagos, cálculo de intereses y mora.
- Envío de recordatorios
- Escalado a cobranzas/legales.
- Informes mensuales del estado de cartera.



## ⚙️ Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/tuusuario/sistema-gestion-creditos.git
   cd sistema-gestion-creditos

2. Instala las dependencias necesarias: 
# Si usas Node.js

npm install

3. Configura el archivo .env con las credenciales necesarias para base de datos, API del Banco Central, etc.

4. Ejecuta las migraciones y levanta el servidor:

# Para Node.js con NestJS
npm run start:dev



## 🚀 Uso

1. Una vez que el sistema esté en funcionamiento:

2. Accede a la aplicación desde http://localhost:8000 o la URL configurada.

3. Inicia sesión con tu usuario (Administrador o Cliente).

4. Según tu rol, accede a las distintas secciones: Gestión de usuarios, Solicitud de crédito, Administración de pagos, etc.

5. Los clientes pueden registrar solicitudes y consultar el estado de sus créditos desde su perfil.



## 🤝 Contribuir

¡Contribuciones son bienvenidas!

Para colaborar contactanos al correo electrónico: miproyecto@gmail.com


## 📄 Licencia

Este software es **propietario** y su uso está restringido. Queda prohibida la copia, redistribución, modificación o cualquier tipo de utilización no autorizada explícitamente por los desarrolladores.

Para más información o para solicitar permisos, por favor contacta a: [miproyecto@tuempresa.com]

Consulta el archivo [`LICENSE`](LICENSE.TXT) para conocer los términos completos.


## 📫 Contacto
Para consultas o soporte técnico, puedes contactar a [miproyecto@gmail.com].


## 🔗 Links

* Este Repositorio: https://github.com/MauricioDanielRamos/rapiCreditos
* Trello: https://trello.com/b/v5XQhvWP/trabajo-final-2do-a%C3%B1o
* Google Drive: https://drive.google.com/drive/folders/17tKyCh1gpbq5MOLn22Plyy-lAPff4nGE
