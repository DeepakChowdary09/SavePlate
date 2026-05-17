from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "AI Agent Onlin", "brain_capacity": "100%"}