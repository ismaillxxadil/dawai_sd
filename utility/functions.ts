import dayjs from "dayjs";

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // نصف قطر الأرض بالكيلومتر
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // المسافة بالكيلومتر
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getDaysAgo(dateString: string) {
  const now = dayjs();
  const created = dayjs(dateString);
  const diff = now.diff(created, "day");
  if (diff === 0) return { text: "اليوم", color: "text-green-600" };
  if (diff === 1) return { text: "منذ 1 يوم", color: "text-green-600" };
  if (diff === 2) return { text: "منذ 2 يوم", color: "text-yellow-600" };
  if (diff === 3) return { text: "منذ 3 أيام", color: "text-yellow-600" };
  return { text: `منذ ${diff} أيام`, color: "text-red-600" };
}
