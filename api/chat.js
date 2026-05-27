export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({
      reply:"Method not allowed"
    });
  }

  try{

    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":
          `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body:JSON.stringify({

          model:"gpt-4o-mini",

          messages:[
            {
              role:"system",
              content:
              "You are ViralForge AI, an expert viral content creator for YouTube Shorts, Reels and TikTok."
            },
            {
              role:"user",
              content:message
            }
          ],

          temperature:0.9

        })

      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content
      || "No response";

    return res.status(200).json({
      reply
    });

  }catch(error){

    return res.status(500).json({
      reply:"Server Error"
    });

  }

}
