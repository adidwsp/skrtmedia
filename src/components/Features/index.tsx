import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-32 md:py-20 md:px-32 lg:py-28 xl:px-64">
        <div className="container">
          <SectionTitle
            title="Visi"  
            paragraph="Terwujudnya generasi muda yang berkarakter Qur'ani, solid dalam persaudaraan, serta menjadi pelopor dalam karya dan kebaikan."
            center
          />
          <h1 className="mb-5 text-center text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl">
            Misi </h1>

          <div className="grid text-center grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-2">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
