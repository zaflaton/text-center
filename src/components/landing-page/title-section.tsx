type TitleSectionProps = {
  title: string
  subheading?: string
  pill: string
}
export default function TitleSection({
  title,
  subheading,
  pill,
}: TitleSectionProps) {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-start md:items-center">
        <article className="rounded-full p-[1.2px] text-sm bg-gradient-to-r from-primary to-secondary">
          <div className="rounded-full px-3 py-1 bg-background ">{pill}</div>
        </article>
        {subheading ? (
          <>
            <h2 className="text-left text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold">
              {title}
            </h2>
            <p className="text-accent-foreground sm:max-w-[450px] md:text-center">
              {subheading}
            </p>
          </>
        ) : (
          <h1 className="text-left text-4xl sm:text-6xl sm:max-w-[850px] md:text-center font-semibold">
            {title}
          </h1>
        )}
      </div>
    </>
  )
}
