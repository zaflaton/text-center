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
      <div className="flex flex-col items-start justify-center gap-4 md:items-center">
        <article className="rounded-full bg-gradient-to-r from-primary to-secondary p-[1.2px] text-sm">
          <div className="rounded-full bg-background px-3 py-1 ">{pill}</div>
        </article>
        {subheading ? (
          <>
            <h2 className="text-left text-3xl font-semibold sm:max-w-[750px] sm:text-5xl md:text-center">
              {title}
            </h2>
            <p className="text-accent-foreground sm:max-w-[450px] md:text-center">
              {subheading}
            </p>
          </>
        ) : (
          <h1 className="text-left text-4xl font-semibold sm:max-w-[850px] sm:text-6xl md:text-center">
            {title}
          </h1>
        )}
      </div>
    </>
  )
}
