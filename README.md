
# Encord Tech Test - Sadik Moazzem

Welcome to my entry for the encord tech test, I had a lot of fun working on this and look forward to going through it soon

If you want to just use the application (not in dev mode) feel free to use 

```bash
  make run
```

Any issues/questions - feel free to contact me on

sadik-moazzem@outlook.com

---




## Installation

Install dependencies with npm

```bash
  nvm use 18.3
  make deps
```
    
## Run Locally

Start the whole app

```bash
  make local
```

Or individually

```bash
  make server
  make app
```

## Run Tests

Run testing suite

```bash
  make test
```

API by default runs on localhost:8000

App runs on localhost:3000

## API Reference

#### Get available image predictions

```http
  GET /image-predictions
```

#### Create a new imageprediction

```http
  POST /image-predictions
```

#### Get a prediction

```http
  GET /predict
```

