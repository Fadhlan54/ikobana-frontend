const colorSet = [
  "0093AD",
  "5720B7",
  "7839EE",
  "432E54",
  "6A1E55",
  "1E3E62",
  "40534C",
  "4B70F5",
  "704264",
  "A87C7C",
  "E3651D",
  "EEE4B1",
  "DA0C81",
  "4477CE",
  "D21312",
  "B6EADA",
];

const avatarSize = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 ",
  xl: "h-20 w-20 md:h-24 md:w-24 text-3xl md:text-[2.825rem]",
};

const fontSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export default function Avatar({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-gray-100 text-white ${avatarSize[size]}`}
      style={{
        backgroundColor: "#" + colorSet[name.length % colorSet.length],
      }}
    >
      {name && (
        <span className={`font-medium text-white ${fontSize[size]}`}>
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

const getInitials = (name: string) => {
  const matches = name.match(/\b\w/g) || [];
  return matches.slice(0, 2).join("").toUpperCase();
};
