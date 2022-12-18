import { Audio } from  'react-loader-spinner'

export const Spinner = () => {
  return (
    <>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
      />
    </>
  );
}