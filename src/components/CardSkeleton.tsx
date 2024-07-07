import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'



const Card = () => {
  return (<div className="p-2 rounded-md flex flex-col gap-3  border border-gray-400">
    <SkeletonTheme baseColor="#70777d" highlightColor="#444">
    <Skeleton/>
    <span className="w-28 mt-2"><Skeleton/></span>
      <ul className="flex gap-4 mt-4">
        <li className="w-28"><Skeleton/></li>
        <li className="w-28"><Skeleton/></li>
        <li className="w-28"><Skeleton/></li>
        <li className="w-28"><Skeleton/></li>
      </ul>
    </SkeletonTheme>
    </div>)
}
const CardSkeleton = () => {
    return ( 
       <ul className="w-[90%] sm:w-2/3 grid grid-cols-1 -mt-12 sm:grid-cols-2 gap-4 relative">
        <li> 
          <Card/>
        </li>
        <li> 
          <Card/>
        </li>
        <li> 
          <Card/>
        </li>
        <li> 
          <Card/>
        </li>
       </ul>
     );
}
 
export default CardSkeleton;