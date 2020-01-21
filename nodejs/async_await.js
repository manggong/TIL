function Promise1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("hello");
    }, 5000);
  });
}

function Promise2() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("world");
    }, 2000);
  });
}

async function helloWorld() {
  const result1 = await Promise1();
  console.log(result1);
  const result2 = await Promise2();
  console.log(result2);
}

helloWorld();