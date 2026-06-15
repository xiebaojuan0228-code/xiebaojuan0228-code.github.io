export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        const response = await fetch(
            "https://api.deepseek.com/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
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

        return res.status(200).json({
            reply: data.choices?.[0]?.message?.content || "没有获取到回复"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
