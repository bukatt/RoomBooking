from db import init_db
from db.session import SessionLocal

def init() -> None:
    db = SessionLocal()
    init_db.init_db(db)

def main() -> None:
    print("initial")
    init()

if __name__ == "__main__":
    main()