console.log("a file stated");

for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 == 0) {
    console.log(`Running loop 1 ${i}`);
  }
}
