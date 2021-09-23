[![Build corinth container](https://github.com/anigenero/corinth-code-challenge/actions/workflows/build.yml/badge.svg)](https://github.com/anigenero/corinth-code-challenge/actions/workflows/build.yml)

## Installation
Run the setup script to ensure that the 
```bash
> ./setup.sh
```

## Build & Deployment

### Docker

To build and run the container project, use `docker-compose`, which will deploy the application
to `http://localhost:3000`

```bash
> docker-compose up --build
```

### npm

You can also run the project locally via `npm`

```bash
> npm start --prefix graph
> npm start --prefix app
```

<div class="footer">
  <img src="https://commerce-notification-service-uat.s3.amazonaws.com/emails/Lifewaylogo__RGB_gray_flat.png" alt="Lifeway Christian Resources" width="150" style="padding: 1rem;">
</div>
