// 1. O ALVO (A Escola/Base)
// Dica: Abra o Google Maps, clique na escola e copie as coordenadas.
export const SCHOOL_COORDS = {
  latitude: -23.55052, // <--- Troque pela Latitude de onde VOCÊ está
  longitude: -46.633309, // <--- Troque pela Longitude
};
// Distância máxima para "ganhar o item" (Geofence)
export const MAX_DISTANCE_METERS = 200;
/**
 * Calcula a distância entre dois pontos no globo 3D.
 * @param {number} playerLat - Latitude do Aluno (Player)
 * @param {number} playerLon - Longitude do Aluno (Player)
 * @param {number} targetLat - Latitude da Escola (Target)
 * @param {number} targetLon - Longitude da Escola (Target)
 */
export const getDistanceInMeters = (
  playerLat,
  playerLon,
  targetLat,
  targetLon,
) => {
  const EARTH_RADIUS = 6371e3; // Raio da Terra em metros (6.371 km)
  // CONVERSÃO DE UNIDADES (Graus para Radianos)
  const playerLatRad = (playerLat * Math.PI) / 180;
  const targetLatRad = (targetLat * Math.PI) / 180;
  // O "DELTA" (A Diferença entre os pontos)
  const diffLat = ((targetLat - playerLat) * Math.PI) / 180;
  const diffLon = ((targetLon - playerLon) * Math.PI) / 180;
  // A FÓRMULA DE HAVERSINE
  const curveCalculation =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(playerLatRad) *
      Math.cos(targetLatRad) *
      Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2);
  // A DISTÂNCIA ANGULAR (O Ângulo Central)
  const centralAngle =
    2 *
    Math.atan2(Math.sqrt(curveCalculation), Math.sqrt(1 - curveCalculation));
  // RESULTADO FINAL
  const distance = EARTH_RADIUS * centralAngle;
  return distance;
};
