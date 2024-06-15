// export const saveProfileUrlToSession = (profileUrl) => {
//   sessionStorage.setItem("profileUrl", profileUrl);
// };
// export const clearProfileUrlToSession = () => {
//   sessionStorage.removeItem("profileUrl");
// };
// export const getProfileUrlToSession = () =>
//   sessionStorage.getItem("profileUrl") || "";

export const formatNumber = (number) => {
  if (Number(number) >= 1 && Number(number) <= 9)
    return `0${JSON.stringify(number)}`;
  return number;
};

export const formatTimePost = (time) => {
  const now = new Date();
  const pastDate = new Date(time);
  const diff = now - pastDate; // Thời gian trôi qua tính bằng milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 2) {
    const day = pastDate.getDate();
    const month = pastDate.getMonth() + 1;
    const year = pastDate.getFullYear();
    return `${day}/${month}/${year}`;
  } else if (days >= 1) {
    return `a day ago`;
  } else if (hours <= 1) {
    return `${minutes} minutes ago`;
  } else if (hours <= 2) {
    return `1 hour ago`;
  } else {
    return `${hours} hours ago`;
  }
};
// console.log(formatTimePost("2024-06-10T16:35:25.969Z"));
