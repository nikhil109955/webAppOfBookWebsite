import Spinner from 'react-bootstrap/Spinner';

function LoadingBox(){
    return (
    <Spinner animation = 'border' role = 'statux'>
        <span className="visuality-hidden">Loading...</span>
    </Spinner>
    )
}
export default LoadingBox;