type Pokemon = {
  name: string;
  // url: string;
  images: {
    small: string;
    large: string;
  };
  types: string[];
  stats: {
    base_stat: number;
    name: string;
  }[];
};
