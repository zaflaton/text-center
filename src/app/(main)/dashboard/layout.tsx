type LayoutProps = {
  children: React.ReactNode
  params: any
}

export default function Layout({ children, params }: LayoutProps) {
  return <main className="flex h-screen overflow-hidden">{children}</main>
}
