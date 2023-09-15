import propTypes from "prop-types";

const Avatar = ({alt, src}) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`h-12 w-12 object-cover rounded-full`}
      />
    </>
  );
};

Avatar.propTypes = {
  alt: propTypes.string,
  src: propTypes.string,
};

export default Avatar;
