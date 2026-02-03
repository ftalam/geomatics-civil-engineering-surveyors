interface PartnerLogoProps {
  name: string;
}

const PartnerLogo = ({ name }: PartnerLogoProps) => {
  return (
    <div className="flex items-center justify-center px-8 py-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <span className="font-display font-bold text-lg text-foreground tracking-wider">
        {name}
      </span>
    </div>
  );
};

export default PartnerLogo;
