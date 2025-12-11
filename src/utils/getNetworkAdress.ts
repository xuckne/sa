export function getNetworkAdress(ip: string, mask: string): string {
  const ipOctets = ip.split('.');
  const maskOctets = mask.split('.');
  const result = [];

  for (let i = 0; i < 4; i++) {
    result.push(Number(ipOctets[i]) & Number(maskOctets[i]));
  }

  return `${result[0]}.${result[1]}.${result[2]}.${result[3]}`;
}
