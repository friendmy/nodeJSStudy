import mongoose from "mongoose";

// 데이터베이스 연결

let database;
let UserSchema;
let UserModel;

// 데이터베이스에 연결하고 응답 객체의 속성으로 객체 추가

const connectDB = () => {
  // 데이터베이스 연결 정보
  let databaseUrl = "mongodb://localhost:27017/local";

  // 데이터베이스 연결
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on("error", console.log.bind(console, "mongoose connection error"));
  database.on("open", () => {
    console.log(`데이터베이스에 연결되었습니다: ${databaseUrl}`);

    // user 스키마 및 모델 객체 생성
    createUserSchema();

    // test 진행함
    doTest();
  });
  database.on("disconnected", connectDB);
};

// user 스키마 및 모델 객체 생성
const createUserSchema = () => {
  // 스키마 정의
  // password를 hash_password로 변경, default 속성 모두 추가, salt 속성 추가
  UserSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, index: "hashed", default: "" },
    age: { type: Number, default: -1 },
    created_at: { type: Date, index: { unique: false }, default: Date.now },
    updated_at: { type: Date, index: { unique: false }, default: Date.now },
  });

  // info를 virtual 메소드로 정의
  UserSchema.virtual("info")
    .set(function (info) {
      let splitted = info.split(" ");
      this.id = splitted[0];
      this.name = splitted[1];
      console.log(`virtual info 설정함 : ${this.id} ${this.name} `);
    })
    .get(function () {
      return this.id + " " + this.name;
    });
  console.log("UserSchema 정의함.");

  // UserModel 모델 정의
  UserModel = mongoose.model("users4", UserSchema);
  console.log("UserModel 정의함");
};

const doTest = () => {
  // UserModel 인스턴스 생성
  // id, password 속성은 할당하지 않고 info 속성만 할당함
  let user = new UserModel({ info: "test03 소녀시대2" });

  // save로 저장
  user.save((err) => {
    if (err) {
      throw err;
    }

    console.log("사용자 데이터 추가함");

    findAll();
  });

  console.log("info 속성에 값 할당함");
  console.log(`id: ${user.id}, name: ${user.name}`);
};

const findAll = () => {
  UserModel.find({}, function (err, results) {
    if (err) {
      throw err;
    }

    if (results) {
      console.log(
        `조회된 user 문서 객체 #0 -> id : ${results[0].id}, name : ${results[0].name}`
      );
    }
  });
};

connectDB();
