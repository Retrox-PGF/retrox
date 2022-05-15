import Header from './Header';
import Aside from './Aside';

export default function Layout(props) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Aside></Aside>
      <div className="flex-grow text-gray-800">
        <Header search={false}></Header>
        {props.children}
      </div>
    </div>
  );
}
