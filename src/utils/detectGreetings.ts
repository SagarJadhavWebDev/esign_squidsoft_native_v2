const getGreetings = () => {
  const data = [
    [22, "Working late"],
    [18, "Good evening"],
    [12, "Good afternoon"],
    [5, "Good morning"],
    [0, "Whoa, early bird"],
  ];
  const greetings = new Date().getHours();
  for (var i = 0; i < data.length; i++) {
    if (greetings >= data[i][0]) {
      console.log(data[i][1]);
      return data[i][1];
    }
  }
};

export default getGreetings;
