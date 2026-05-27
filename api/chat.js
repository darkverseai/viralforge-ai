async function generateContent() {

  const topic =
    document.getElementById("topic").value;

  const result =
    document.getElementById("result");

  result.innerHTML = "Loading...";

  try {

    const response = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message:
        `Create viral YouTube content ideas about ${topic}`
      })

    });

    const data = await response.json();

    result.innerHTML = data.reply;

  } catch (error) {

    result.innerHTML = "AI Failed";

  }

}
