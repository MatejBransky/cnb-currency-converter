import {
  AU,
  BR,
  CA,
  CH,
  CN,
  CZ,
  DK,
  EU,
  GB,
  HK,
  HU,
  ID,
  IL,
  IN,
  IS,
  JP,
  KR,
  MX,
  MY,
  NO,
  NZ,
  PH,
  PL,
  RO,
  SE,
  SG,
  TH,
  TR,
  US,
  ZA,
  type Props as FlagComponentProps,
} from "country-flag-icons/react/3x2";
import type { FunctionComponent } from "react";
import { IMFFlag3x2 } from "./IMFFlag";

const flags: Record<string, FunctionComponent> = {
  Czechia: CZ,
  USA: US,
  Australia: AU,
  Brazil: BR,
  Canada: CA,
  China: CN,
  Denmark: DK,
  EMU: EU,
  Hongkong: HK,
  Hungary: HU,
  Iceland: IS,
  IMF: IMFFlag3x2,
  India: IN,
  Indonesia: ID,
  Israel: IL,
  Japan: JP,
  Malaysia: MY,
  Mexico: MX,
  "New Zealand": NZ,
  Norway: NO,
  Philippines: PH,
  Poland: PL,
  Romania: RO,
  Singapore: SG,
  "South Africa": ZA,
  "South Korea": KR,
  Sweden: SE,
  Switzerland: CH,
  Thailand: TH,
  Turkey: TR,
  "United Kingdom": GB,
};

interface FlagProps extends FlagComponentProps {
  country: string;
}

export const Flag = ({ country, ...props }: FlagProps) => {
  const CountryFlag = flags[country];

  if (!CountryFlag) {
    console.warn(`Flag for the country "${country} was not found."`);
    return null;
  }

  return <CountryFlag {...props} />;
};
