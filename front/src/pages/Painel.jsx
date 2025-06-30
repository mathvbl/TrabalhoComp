export default function Painel() {
  return (
    <div className="bg-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">
            Entrada rápida. Sem papel. Com tecnologia.
          </h2>
          <p className="text-lg text-blue-800 max-w-3xl mx-auto">
            Com a FaceTicket, entra em eventos apenas com o seu rosto. Elimine filas, bilhetes físicos e burocracia.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-700 text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Segurança Facial</h3>
            <p className="text-gray-600">Tecnologia biométrica para garantir a sua identidade e proteção em eventos.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-700 text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Entrada Instantânea</h3>
            <p className="text-gray-600">Valide a sua presença automaticamente com reconhecimento facial em segundos.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="text-blue-700 text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Agenda de Jogos</h3>
            <p className="text-gray-600">Visualize os próximos jogos e eventos disponíveis para reserva.</p>
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold text-blue-800 mb-8 text-center">Próximos Eventos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-blue-900 mb-2">Final Campeonato Estadual</h4>
              <p className="text-gray-700">Arena Azul - 12/07/2025 às 18:00</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition">Reservar</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-blue-900 mb-2">Brasil x Argentina</h4>
              <p className="text-gray-700">Estádio Nacional - 21/07/2025 às 16:00</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition">Reservar</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-xl text-blue-900 mb-2">Semifinal Copa Nacional</h4>
              <p className="text-gray-700">Estádio Olímpico - 28/07/2025 às 20:30</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition">Reservar</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


