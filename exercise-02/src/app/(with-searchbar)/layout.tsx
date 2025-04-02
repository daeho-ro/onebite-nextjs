export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div>서치바 레이아웃</div>
      {children}
    </div>
  );
}
