import TituloSeccion from "../molecules/TituloSeccion";

/** Organismo: video informativo embebido. */
export default function VideoInformativo() {
  return (
    <section className="container py-5">
      <TituloSeccion texto="Así lavamos tu ropa clínica" />
      <div className="ratio ratio-16x9 mx-auto video-caja">
        <video controls preload="metadata" poster={`${import.meta.env.BASE_URL}media/poster.jpg`}>
          <source src={`${import.meta.env.BASE_URL}media/cuidado-ropa-clinica.mp4`} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      </div>
      <p className="text-center text-secondary small mt-3">
        Video informativo: las etapas del lavado industrial hospitalario, de la recepción al planchado.
      </p>
    </section>
  );
}
