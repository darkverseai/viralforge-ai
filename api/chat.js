export default async function handler(req, res) {

  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: "gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content:
                "You are ViralForge AI, expert in viral YouTube Shorts content."
            },

            {
              role: "user",
              content: message
            }
          ],

          temperature: 0.9
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response from AI"
    });

  } catch (error) {

    res.status(500).json({
      reply: "Server Error"
    });

  }

}
