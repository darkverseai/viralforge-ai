export default async function handler(req, res) {

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
          `Bearer ${process.env.GROQ_API_KEY}`
        },

        body: JSON.stringify({

          model: "llama3-70b-8192",

          messages: [
            {
              role: "user",
              content: message
            }
          ]

        })

      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content;

    res.status(200).json({
      reply: reply || "No response"
    });

  } catch (error) {

    res.status(500).json({
      reply: "Server Error"
    });

  }

}
