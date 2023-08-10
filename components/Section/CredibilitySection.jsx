import PlainCard from "../Cards/PlainCard"
import { credibilityStats } from "@/data/credibilityStats";




const CredibilitySection = () => {
  return (

      <div className="max-w-7xl mx-auto px-4 pt-12">
        {/* <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us</h2> */}
        <div className="max-w-5xl m-auto grid grid-cols-2  md:grid-cols-4 gap-">
          {credibilityStats.map((data, index) => (
            <PlainCard
              key={index}
              icon={data.icon}
              stats={data.stats}
              label={data.label}
            />
          ))}
        </div>
      </div>

  )
}

export default CredibilitySection