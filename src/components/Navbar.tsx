import Link from "next/link";

function Navbar() {
  return (
    <nav className=" container flex justify-between items-center py-4 px-5">
      <h3 className=" text-2xl font-bold">
        <Link href={"/"}>NextCrud</Link>
      </h3>
      <ul>
        <li>
          <Link href="/new" className=" text-slate-200 hover:text-slate-400">
            New Task
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
