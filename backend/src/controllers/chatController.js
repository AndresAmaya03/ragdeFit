const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Controlador para manejar la lógica del chat
const chatController = async (req, res) => {
  const { text } = req.body;  // Extraemos el texto que el usuario envió

  // Verificamos que se haya enviado el texto
  if (!text) {
    return res.status(400).json({ error: 'El texto es obligatorio.' });
  }

  try {
    // Hacemos la solicitud al modelo de Ollama
    const response = await fetch('http://127.0.0.1:11434/v1/models/smollm2:135m', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      throw new Error('Error al comunicarse con el modelo de Ollama.');
    }

    // Extraemos la respuesta del modelo
    const data = await response.json();
    const generatedText = data[0]?.generated_text || 'Lo siento, no puedo generar una respuesta.';

    // Respondemos con el texto generado por el modelo
    res.json({ generatedText });
  } catch (error) {
    console.error('Error al obtener respuesta del modelo:', error.message);
    res.status(500).json({ error: 'Error al obtener respuesta del modelo.' });
  }
};

module.exports = chatController;

