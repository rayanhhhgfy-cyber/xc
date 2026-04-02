import { Molecule } from 'openchemlib';

export type ReactionType = 'synthesis' | 'decomposition' | 'single-replacement' | 'double-replacement' | 'combustion' | 'acid-base' | 'redox' | 'precipitation' | 'neutralization' | 'oxidation' | 'reduction' | 'hydrolysis' | 'esterification' | 'polymerization' | 'fermentation' | 'photosynthesis' | 'electrolysis' | 'nuclear';
export type Visual = 'explosion' | 'fire' | 'bubbles' | 'precipitate' | 'color-change' | 'gas-release' | 'glow' | 'smoke' | 'dissolve' | 'crystallize' | 'spark' | 'vapor' | 'freeze' | 'melt' | 'boil' | 'condense' | 'effervescence' | 'luminescence';

export interface Reaction {
  id: string;
  reactants: string[];
  eq: string;
  balanced: string;
  products: string[];
  type: ReactionType;
  visual: Visual;
  color: string;
  enthalpy: number;
  desc: string;
  safety?: string;
  temp?: string;
  catalyst?: string;
  realUse: string;
  smiles?: string;
}

// Pre-added compounds that users can select
export const preAddedCompounds: Array<{formula: string, name: string, smiles?: string}> = [
  { formula: 'H2O', name: 'Water', smiles: 'O' },
  { formula: 'H2', name: 'Hydrogen Gas', smiles: '[H][H]' },
  { formula: 'O2', name: 'Oxygen Gas', smiles: 'O=O' },
  { formula: 'N2', name: 'Nitrogen Gas', smiles: 'N#N' },
  { formula: 'CO2', name: 'Carbon Dioxide', smiles: 'O=C=O' },
  { formula: 'CH4', name: 'Methane', smiles: 'C' },
  { formula: 'NH3', name: 'Ammonia', smiles: 'N' },
  { formula: 'HCl', name: 'Hydrochloric Acid', smiles: 'Cl' },
  { formula: 'NaCl', name: 'Table Salt', smiles: '[Na+].[Cl-]' },
  { formula: 'H2SO4', name: 'Sulfuric Acid', smiles: 'OS(=O)(=O)O' },
  { formula: 'NaOH', name: 'Sodium Hydroxide', smiles: '[OH-].[Na+]' },
  { formula: 'CaCO3', name: 'Calcium Carbonate', smiles: '[Ca+2].[O-]C([O-])=O' },
  { formula: 'Fe2O3', name: 'Iron(III) Oxide', smiles: '[Fe+3].[Fe+3].[O-2].[O-2].[O-2]' },
  { formula: 'Al2O3', name: 'Aluminum Oxide', smiles: '[Al+3].[Al+3].[O-2].[O-2].[O-2]' },
  { formula: 'SiO2', name: 'Silicon Dioxide', smiles: 'O=[Si]=O' },
  { formula: 'CuSO4', name: 'Copper(II) Sulfate', smiles: '[Cu+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'ZnO', name: 'Zinc Oxide', smiles: '[Zn+2].[O-2]' },
  { formula: 'AgNO3', name: 'Silver Nitrate', smiles: '[Ag+].[O-][N+](=O)[O-]' },
  { formula: 'BaSO4', name: 'Barium Sulfate', smiles: '[Ba+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'PbO', name: 'Lead(II) Oxide', smiles: '[Pb+2].[O-2]' },
  { formula: 'HgO', name: 'Mercury(II) Oxide', smiles: '[Hg+2].[O-2]' },
  { formula: 'SnO2', name: 'Tin(IV) Oxide', smiles: '[Sn+4].[O-2].[O-2]' },
  { formula: 'TiO2', name: 'Titanium Dioxide', smiles: '[Ti+4].[O-2].[O-2]' },
  { formula: 'Cr2O3', name: 'Chromium(III) Oxide', smiles: '[Cr+3].[Cr+3].[O-2].[O-2].[O-2]' },
  { formula: 'MnO2', name: 'Manganese Dioxide', smiles: '[Mn+4].[O-2].[O-2]' },
  { formula: 'KOH', name: 'Potassium Hydroxide', smiles: '[OH-].[K+]' },
  { formula: 'Ca(OH)2', name: 'Calcium Hydroxide', smiles: '[Ca+2].[OH-].[OH-]' },
  { formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', smiles: '[Mg+2].[OH-].[OH-]' },
  { formula: 'Na2CO3', name: 'Sodium Carbonate', smiles: '[Na+].[Na+].[O-]C([O-])=O' },
  { formula: 'NaHCO3', name: 'Sodium Bicarbonate', smiles: '[Na+].[O-]C(=O)[O-]' },
  { formula: 'HNO3', name: 'Nitric Acid', smiles: 'O[N+](=O)[O-]' },
  { formula: 'H2CO3', name: 'Carbonic Acid', smiles: 'O=C(O)O' },
  { formula: 'CH3COOH', name: 'Acetic Acid', smiles: 'CC(=O)O' },
  { formula: 'C2H5OH', name: 'Ethanol', smiles: 'CCO' },
  { formula: 'C6H12O6', name: 'Glucose', smiles: 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C12H22O11', name: 'Sucrose', smiles: 'OC[C@H]1O[C@@H](OC[C@H]2O[C@@H](O)[C@H](O)[C@@H]2O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'NaNO3', name: 'Sodium Nitrate', smiles: '[Na+].[O-][N+](=O)[O-]' },
  { formula: 'KNO3', name: 'Potassium Nitrate', smiles: '[K+].[O-][N+](=O)[O-]' },
  { formula: 'Ca(NO3)2', name: 'Calcium Nitrate', smiles: '[Ca+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'NH4Cl', name: 'Ammonium Chloride', smiles: '[NH4+].[Cl-]' },
  { formula: 'NH4NO3', name: 'Ammonium Nitrate', smiles: '[NH4+].[O-][N+](=O)[O-]' },
  { formula: 'CuCl2', name: 'Copper(II) Chloride', smiles: '[Cu+2].[Cl-].[Cl-]' },
  { formula: 'FeCl3', name: 'Iron(III) Chloride', smiles: '[Fe+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'AlCl3', name: 'Aluminum Chloride', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'ZnCl2', name: 'Zinc Chloride', smiles: '[Zn+2].[Cl-].[Cl-]' },
  { formula: 'MgCl2', name: 'Magnesium Chloride', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { formula: 'CaCl2', name: 'Calcium Chloride', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { formula: 'Na2SO4', name: 'Sodium Sulfate', smiles: '[Na+].[Na+].[O-]S(=O)(=O)[O-]' },
  { formula: 'K2SO4', name: 'Potassium Sulfate', smiles: '[K+].[K+].[O-]S(=O)(=O)[O-]' },
  { formula: 'MgSO4', name: 'Magnesium Sulfate', smiles: '[Mg+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'Cu(NO3)2', name: 'Copper(II) Nitrate', smiles: '[Cu+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'Zn(NO3)2', name: 'Zinc Nitrate', smiles: '[Zn+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'Pb(NO3)2', name: 'Lead(II) Nitrate', smiles: '[Pb+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { formula: 'AgCl', name: 'Silver Chloride', smiles: '[Ag+].[Cl-]' },
  { formula: 'PbCl2', name: 'Lead(II) Chloride', smiles: '[Pb+2].[Cl-].[Cl-]' },
  { formula: 'HgCl2', name: 'Mercury(II) Chloride', smiles: '[Hg+2].[Cl-].[Cl-]' },
  { formula: 'ZnS', name: 'Zinc Sulfide', smiles: '[Zn+2].[S-2]' },
  { formula: 'PbS', name: 'Lead(II) Sulfide', smiles: '[Pb+2].[S-2]' },
  { formula: 'HgS', name: 'Mercury(II) Sulfide', smiles: '[Hg+2].[S-2]' },
  { formula: 'CuO', name: 'Copper(II) Oxide', smiles: '[Cu+2].[O-2]' },
  { formula: 'FeO', name: 'Iron(II) Oxide', smiles: '[Fe+2].[O-2]' },
  { formula: 'Fe3O4', name: 'Iron(II,III) Oxide', smiles: '[Fe+2].[Fe+3].[Fe+3].[O-2].[O-2].[O-2].[O-2]' },
  { formula: 'MnO', name: 'Manganese(II) Oxide', smiles: '[Mn+2].[O-2]' },
  { formula: 'CoO', name: 'Cobalt(II) Oxide', smiles: '[Co+2].[O-2]' },
  { formula: 'NiO', name: 'Nickel(II) Oxide', smiles: '[Ni+2].[O-2]' },
  { formula: 'CaO', name: 'Calcium Oxide', smiles: '[Ca+2].[O-2]' },
  { formula: 'MgO', name: 'Magnesium Oxide', smiles: '[Mg+2].[O-2]' },
  { formula: 'Na2O', name: 'Sodium Oxide', smiles: '[Na+].[Na+].[O-2]' },
  { formula: 'K2O', name: 'Potassium Oxide', smiles: '[K+].[K+].[O-2]' },
  { formula: 'Li2O', name: 'Lithium Oxide', smiles: '[Li+].[Li+].[O-2]' },
  { formula: 'P4O10', name: 'Phosphorus Pentoxide', smiles: 'O=P(=O)(O)O' },
  { formula: 'SO2', name: 'Sulfur Dioxide', smiles: 'O=S=O' },
  { formula: 'SO3', name: 'Sulfur Trioxide', smiles: 'O=S(=O)=O' },
  { formula: 'NO', name: 'Nitric Oxide', smiles: '[N]=O' },
  { formula: 'NO2', name: 'Nitrogen Dioxide', smiles: '[N+](=O)[O-]' },
  { formula: 'N2O', name: 'Nitrous Oxide', smiles: 'N#N=O' },
  { formula: 'CO', name: 'Carbon Monoxide', smiles: '[C-]#[O+]' },
  { formula: 'H2S', name: 'Hydrogen Sulfide', smiles: 'S' },
  { formula: 'PH3', name: 'Phosphine', smiles: 'P' },
  { formula: 'SiH4', name: 'Silane', smiles: '[SiH4]' },
  { formula: 'BF3', name: 'Boron Trifluoride', smiles: 'FB(F)F' },
  { formula: 'NF3', name: 'Nitrogen Trifluoride', smiles: 'FN(F)F' },
  { formula: 'CH3OH', name: 'Methanol', smiles: 'CO' },
  { formula: 'C2H4', name: 'Ethylene', smiles: 'C=C' },
  { formula: 'C2H2', name: 'Acetylene', smiles: 'C#C' },
  { formula: 'C6H6', name: 'Benzene', smiles: 'c1ccccc1' },
  { formula: 'CH3COONa', name: 'Sodium Acetate', smiles: '[Na+].CC([O-])=O' },
  { formula: 'Na3PO4', name: 'Sodium Phosphate', smiles: '[Na+].[Na+].[Na+].[O-]P(=O)([O-])[O-]' },
  { formula: 'Ca3(PO4)2', name: 'Calcium Phosphate', smiles: '[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-]' },
  { formula: 'Al(OH)3', name: 'Aluminum Hydroxide', smiles: '[Al+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fe(OH)3', name: 'Iron(III) Hydroxide', smiles: '[Fe+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cu(OH)2', name: 'Copper(II) Hydroxide', smiles: '[Cu+2].[OH-].[OH-]' },
  { formula: 'Zn(OH)2', name: 'Zinc Hydroxide', smiles: '[Zn+2].[OH-].[OH-]' },
  { formula: 'NaBr', name: 'Sodium Bromide', smiles: '[Na+].[Br-]' },
  { formula: 'KBr', name: 'Potassium Bromide', smiles: '[K+].[Br-]' },
  { formula: 'NaI', name: 'Sodium Iodide', smiles: '[Na+].[I-]' },
  { formula: 'KI', name: 'Potassium Iodide', smiles: '[K+].[I-]' },
  { formula: 'CaBr2', name: 'Calcium Bromide', smiles: '[Ca+2].[Br-].[Br-]' },
  { formula: 'CaI2', name: 'Calcium Iodide', smiles: '[Ca+2].[I-].[I-]' },
  { formula: 'MgBr2', name: 'Magnesium Bromide', smiles: '[Mg+2].[Br-].[Br-]' },
  { formula: 'MgI2', name: 'Magnesium Iodide', smiles: '[Mg+2].[I-].[I-]' },
  { formula: 'BaCl2', name: 'Barium Chloride', smiles: '[Ba+2].[Cl-].[Cl-]' },
  { formula: 'BaBr2', name: 'Barium Bromide', smiles: '[Ba+2].[Br-].[Br-]' },
  { formula: 'BaI2', name: 'Barium Iodide', smiles: '[Ba+2].[I-].[I-]' },
  { formula: 'SrCl2', name: 'Strontium Chloride', smiles: '[Sr+2].[Cl-].[Cl-]' },
  { formula: 'SrBr2', name: 'Strontium Bromide', smiles: '[Sr+2].[Br-].[Br-]' },
  { formula: 'SrI2', name: 'Strontium Iodide', smiles: '[Sr+2].[I-].[I-]' },
  { formula: 'BeCl2', name: 'Beryllium Chloride', smiles: '[Be+2].[Cl-].[Cl-]' },
  { formula: 'BeBr2', name: 'Beryllium Bromide', smiles: '[Be+2].[Br-].[Br-]' },
  { formula: 'BeI2', name: 'Beryllium Iodide', smiles: '[Be+2].[I-].[I-]' },
  { formula: 'LiCl', name: 'Lithium Chloride', smiles: '[Li+].[Cl-]' },
  { formula: 'LiBr', name: 'Lithium Bromide', smiles: '[Li+].[Br-]' },
  { formula: 'LiI', name: 'Lithium Iodide', smiles: '[Li+].[I-]' },
  { formula: 'CsCl', name: 'Cesium Chloride', smiles: '[Cs+].[Cl-]' },
  { formula: 'CsBr', name: 'Cesium Bromide', smiles: '[Cs+].[Br-]' },
  { formula: 'CsI', name: 'Cesium Iodide', smiles: '[Cs+].[I-]' },
  { formula: 'RbCl', name: 'Rubidium Chloride', smiles: '[Rb+].[Cl-]' },
  { formula: 'RbBr', name: 'Rubidium Bromide', smiles: '[Rb+].[Br-]' },
  { formula: 'RbI', name: 'Rubidium Iodide', smiles: '[Rb+].[I-]' },
  { formula: 'AgBr', name: 'Silver Bromide', smiles: '[Ag+].[Br-]' },
  { formula: 'AgI', name: 'Silver Iodide', smiles: '[Ag+].[I-]' },
  { formula: 'HgBr2', name: 'Mercury(II) Bromide', smiles: '[Hg+2].[Br-].[Br-]' },
  { formula: 'HgI2', name: 'Mercury(II) Iodide', smiles: '[Hg+2].[I-].[I-]' },
  { formula: 'TlCl', name: 'Thallium(I) Chloride', smiles: '[Tl+].[Cl-]' },
  { formula: 'TlBr', name: 'Thallium(I) Bromide', smiles: '[Tl+].[Br-]' },
  { formula: 'TlI', name: 'Thallium(I) Iodide', smiles: '[Tl+].[I-]' },
  { formula: 'SnCl2', name: 'Tin(II) Chloride', smiles: '[Sn+2].[Cl-].[Cl-]' },
  { formula: 'SnBr2', name: 'Tin(II) Bromide', smiles: '[Sn+2].[Br-].[Br-]' },
  { formula: 'SnI2', name: 'Tin(II) Iodide', smiles: '[Sn+2].[I-].[I-]' },
  { formula: 'PbBr2', name: 'Lead(II) Bromide', smiles: '[Pb+2].[Br-].[Br-]' },
  { formula: 'PbI2', name: 'Lead(II) Iodide', smiles: '[Pb+2].[I-].[I-]' },
  { formula: 'BiCl3', name: 'Bismuth(III) Chloride', smiles: '[Bi+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'SbCl3', name: 'Antimony(III) Chloride', smiles: '[Sb+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'AsCl3', name: 'Arsenic(III) Chloride', smiles: 'Cl[As](Cl)Cl' },
  { formula: 'PCl3', name: 'Phosphorus Trichloride', smiles: 'ClP(Cl)Cl' },
  { formula: 'PCl5', name: 'Phosphorus Pentachloride', smiles: 'ClP(Cl)(Cl)(Cl)Cl' },
  { formula: 'SCl2', name: 'Sulfur Dichloride', smiles: 'ClSCl' },
  { formula: 'SeCl2', name: 'Selenium Dichloride', smiles: 'Cl[Se]Cl' },
  { formula: 'ICl', name: 'Iodine Monochloride', smiles: 'ClI' },
  { formula: 'ICl3', name: 'Iodine Trichloride', smiles: 'ClI(Cl)Cl' },
  { formula: 'BrCl', name: 'Bromine Monochloride', smiles: 'BrCl' },
  { formula: 'ClF', name: 'Chlorine Monofluoride', smiles: 'ClF' },
  { formula: 'ClF3', name: 'Chlorine Trifluoride', smiles: 'ClF(F)F' },
  { formula: 'BrF3', name: 'Bromine Trifluoride', smiles: 'BrF(F)F' },
  { formula: 'IF3', name: 'Iodine Trifluoride', smiles: 'FI(F)F' },
  { formula: 'IF5', name: 'Iodine Pentafluoride', smiles: 'FI(F)(F)(F)F' },
  { formula: 'IF7', name: 'Iodine Heptafluoride', smiles: 'FI(F)(F)(F)(F)(F)F' },
  { formula: 'XeF2', name: 'Xenon Difluoride', smiles: 'F[Xe]F' },
  { formula: 'XeF4', name: 'Xenon Tetrafluoride', smiles: 'F[Xe](F)(F)F' },
  { formula: 'XeF6', name: 'Xenon Hexafluoride', smiles: 'F[Xe](F)(F)(F)(F)F' },
  { formula: 'KrF2', name: 'Krypton Difluoride', smiles: 'F[Kr]F' },
  { formula: 'RnF2', name: 'Radon Difluoride', smiles: 'F[Rn]F' },
  { formula: 'H2O2', name: 'Hydrogen Peroxide', smiles: 'OO' },
  { formula: 'Na2O2', name: 'Sodium Peroxide', smiles: '[Na+].[Na+].[O-].[O-]' },
  { formula: 'BaO2', name: 'Barium Peroxide', smiles: '[Ba+2].[O-].[O-]' },
  { formula: 'MgO2', name: 'Magnesium Peroxide', smiles: '[Mg+2].[O-].[O-]' },
  { formula: 'CaO2', name: 'Calcium Peroxide', smiles: '[Ca+2].[O-].[O-]' },
  { formula: 'Li2O2', name: 'Lithium Peroxide', smiles: '[Li+].[Li+].[O-].[O-]' },
  { formula: 'K2O2', name: 'Potassium Peroxide', smiles: '[K+].[K+].[O-].[O-]' },
  { formula: 'NaOCl', name: 'Sodium Hypochlorite', smiles: '[Na+].[O-]Cl' },
  { formula: 'Ca(OCl)2', name: 'Calcium Hypochlorite', smiles: '[Ca+2].[O-]Cl.[O-]Cl' },
  { formula: 'KMnO4', name: 'Potassium Permanganate', smiles: '[K+].[O-][Mn](=O)(=O)=O' },
  { formula: 'K2Cr2O7', name: 'Potassium Dichromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'Na2Cr2O7', name: 'Sodium Dichromate', smiles: '[Na+].[Na+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'K2CrO4', name: 'Potassium Chromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Na2CrO4', name: 'Sodium Chromate', smiles: '[Na+].[Na+].[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Na2S2O3', name: 'Sodium Thiosulfate', smiles: '[Na+].[Na+].[O-]S(=O)(=S)[O-]' },
  { formula: 'Na2S', name: 'Sodium Sulfide', smiles: '[Na+].[Na+].[S-2]' },
  { formula: 'K2S', name: 'Potassium Sulfide', smiles: '[K+].[K+].[S-2]' },
  { formula: 'CaS', name: 'Calcium Sulfide', smiles: '[Ca+2].[S-2]' },
  { formula: 'MgS', name: 'Magnesium Sulfide', smiles: '[Mg+2].[S-2]' },
  { formula: 'BaS', name: 'Barium Sulfide', smiles: '[Ba+2].[S-2]' },
  { formula: 'SrS', name: 'Strontium Sulfide', smiles: '[Sr+2].[S-2]' },
  { formula: 'BeS', name: 'Beryllium Sulfide', smiles: '[Be+2].[S-2]' },
  { formula: 'Al2S3', name: 'Aluminum Sulfide', smiles: '[Al+3].[Al+3].[S-2].[S-2].[S-2]' },
  { formula: 'FeS', name: 'Iron(II) Sulfide', smiles: '[Fe+2].[S-2]' },
  { formula: 'Fe2S3', name: 'Iron(III) Sulfide', smiles: '[Fe+3].[Fe+3].[S-2].[S-2].[S-2]' },
  { formula: 'CuS', name: 'Copper(II) Sulfide', smiles: '[Cu+2].[S-2]' },
  { formula: 'Cu2S', name: 'Copper(I) Sulfide', smiles: '[Cu+].[Cu+].[S-2]' },
  { formula: 'ZnS', name: 'Zinc Sulfide', smiles: '[Zn+2].[S-2]' },
  { formula: 'CdS', name: 'Cadmium Sulfide', smiles: '[Cd+2].[S-2]' },
  { formula: 'HgS', name: 'Mercury(II) Sulfide', smiles: '[Hg+2].[S-2]' },
  { formula: 'SnS', name: 'Tin(II) Sulfide', smiles: '[Sn+2].[S-2]' },
  { formula: 'SnS2', name: 'Tin(IV) Sulfide', smiles: '[Sn+4].[S-2].[S-2]' },
  { formula: 'PbS', name: 'Lead(II) Sulfide', smiles: '[Pb+2].[S-2]' },
  { formula: 'Bi2S3', name: 'Bismuth(III) Sulfide', smiles: '[Bi+3].[Bi+3].[S-2].[S-2].[S-2]' },
  { formula: 'Sb2S3', name: 'Antimony(III) Sulfide', smiles: '[Sb+3].[Sb+3].[S-2].[S-2].[S-2]' },
  { formula: 'As2S3', name: 'Arsenic(III) Sulfide', smiles: 'S[As]1SS[As](S1)S' },
  { formula: 'P4S3', name: 'Tetraphosphorus Trisulfide', smiles: 'P12SP3S1P2S2' },
  { formula: 'P4S10', name: 'Tetraphosphorus Decasulfide', smiles: 'P12SP3S1P2S2P3S3' },
  { formula: 'NaCN', name: 'Sodium Cyanide', smiles: '[Na+].[C-]#N' },
  { formula: 'KCN', name: 'Potassium Cyanide', smiles: '[K+].[C-]#N' },
  { formula: 'HCN', name: 'Hydrogen Cyanide', smiles: 'C#N' },
  { formula: 'NaSCN', name: 'Sodium Thiocyanate', smiles: '[Na+].[S-]C#N' },
  { formula: 'KSCN', name: 'Potassium Thiocyanate', smiles: '[K+].[S-]C#N' },
  { formula: 'NH4SCN', name: 'Ammonium Thiocyanate', smiles: '[NH4+].[S-]C#N' },
  { formula: 'Na2SiO3', name: 'Sodium Metasilicate', smiles: '[Na+].[Na+].[O-][Si](=O)[O-]' },
  { formula: 'Na4SiO4', name: 'Sodium Orthosilicate', smiles: '[Na+].[Na+].[Na+].[Na+].[O-][Si]([O-])([O-])[O-]' },
  { formula: 'CaSiO3', name: 'Calcium Metasilicate', smiles: '[Ca+2].[O-][Si](=O)[O-]' },
  { formula: 'MgSiO3', name: 'Magnesium Metasilicate', smiles: '[Mg+2].[O-][Si](=O)[O-]' },
  { formula: 'Al2SiO5', name: 'Aluminum Silicate', smiles: '[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'NaAlSi3O8', name: 'Albite', smiles: '[Na+].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'KAlSi3O8', name: 'Orthoclase', smiles: '[K+].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'CaAl2Si2O8', name: 'Anorthite', smiles: '[Ca+2].[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-]' },
  { formula: 'Mg3Si4O10(OH)2', name: 'Talc', smiles: '[Mg+2].[Mg+2].[Mg+2].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[OH-].[OH-]' },
  { formula: 'Al2Si2O5(OH)4', name: 'Kaolinite', smiles: '[Al+3].[Al+3].[O-][Si](=O)[O-].[O-][Si](=O)[O-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ca5(PO4)3F', name: 'Fluorapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[F-]' },
  { formula: 'Ca5(PO4)3OH', name: 'Hydroxyapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[OH-]' },
  { formula: 'Ca5(PO4)3Cl', name: 'Chlorapatite', smiles: '[Ca+2].[Ca+2].[Ca+2].[Ca+2].[Ca+2].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[O-]P(=O)([O-])[O-].[Cl-]' },
  { formula: 'CaF2', name: 'Fluorite', smiles: '[Ca+2].[F-].[F-]' },
  { formula: 'BaF2', name: 'Barium Fluoride', smiles: '[Ba+2].[F-].[F-]' },
  { formula: 'SrF2', name: 'Strontium Fluoride', smiles: '[Sr+2].[F-].[F-]' },
  { formula: 'MgF2', name: 'Magnesium Fluoride', smiles: '[Mg+2].[F-].[F-]' },
  { formula: 'BeF2', name: 'Beryllium Fluoride', smiles: '[Be+2].[F-].[F-]' },
  { formula: 'LiF', name: 'Lithium Fluoride', smiles: '[Li+].[F-]' },
  { formula: 'NaF', name: 'Sodium Fluoride', smiles: '[Na+].[F-]' },
  { formula: 'KF', name: 'Potassium Fluoride', smiles: '[K+].[F-]' },
  { formula: 'CsF', name: 'Cesium Fluoride', smiles: '[Cs+].[F-]' },
  { formula: 'RbF', name: 'Rubidium Fluoride', smiles: '[Rb+].[F-]' },
  { formula: 'AgF', name: 'Silver Fluoride', smiles: '[Ag+].[F-]' },
  { formula: 'HgF2', name: 'Mercury(II) Fluoride', smiles: '[Hg+2].[F-].[F-]' },
  { formula: 'SnF2', name: 'Tin(II) Fluoride', smiles: '[Sn+2].[F-].[F-]' },
  { formula: 'SnF4', name: 'Tin(IV) Fluoride', smiles: '[Sn+4].[F-].[F-].[F-].[F-]' },
  { formula: 'PbF2', name: 'Lead(II) Fluoride', smiles: '[Pb+2].[F-].[F-]' },
  { formula: 'BiF3', name: 'Bismuth(III) Fluoride', smiles: '[Bi+3].[F-].[F-].[F-]' },
  { formula: 'SbF3', name: 'Antimony(III) Fluoride', smiles: '[Sb+3].[F-].[F-].[F-]' },
  { formula: 'AsF3', name: 'Arsenic(III) Fluoride', smiles: 'F[As](F)F' },
  { formula: 'PF3', name: 'Phosphorus Trifluoride', smiles: 'FP(F)F' },
  { formula: 'PF5', name: 'Phosphorus Pentafluoride', smiles: 'FP(F)(F)(F)F' },
  { formula: 'SF4', name: 'Sulfur Tetrafluoride', smiles: 'FS(F)(F)F' },
  { formula: 'SF6', name: 'Sulfur Hexafluoride', smiles: 'FS(F)(F)(F)(F)F' },
  { formula: 'SeF4', name: 'Selenium Tetrafluoride', smiles: 'F[Se](F)(F)F' },
  { formula: 'SeF6', name: 'Selenium Hexafluoride', smiles: 'F[Se](F)(F)(F)(F)F' },
  { formula: 'TeF4', name: 'Tellurium Tetrafluoride', smiles: 'F[Te](F)(F)F' },
  { formula: 'TeF6', name: 'Tellurium Hexafluoride', smiles: 'F[Te](F)(F)(F)(F)F' },
  { formula: 'ClF', name: 'Chlorine Monofluoride', smiles: 'FCl' },
  { formula: 'ClF3', name: 'Chlorine Trifluoride', smiles: 'FCl(F)F' },
  { formula: 'ClF5', name: 'Chlorine Pentafluoride', smiles: 'FCl(F)(F)(F)F' },
  { formula: 'BrF', name: 'Bromine Monofluoride', smiles: 'FBr' },
  { formula: 'BrF3', name: 'Bromine Trifluoride', smiles: 'FBr(F)F' },
  { formula: 'BrF5', name: 'Bromine Pentafluoride', smiles: 'FBr(F)(F)(F)F' },
  { formula: 'IF', name: 'Iodine Monofluoride', smiles: 'FI' },
  { formula: 'IF3', name: 'Iodine Trifluoride', smiles: 'FI(F)F' },
  { formula: 'IF5', name: 'Iodine Pentafluoride', smiles: 'FI(F)(F)(F)F' },
  { formula: 'IF7', name: 'Iodine Heptafluoride', smiles: 'FI(F)(F)(F)(F)(F)F' },
  { formula: 'KrF2', name: 'Krypton Difluoride', smiles: 'F[Kr]F' },
  { formula: 'XeF2', name: 'Xenon Difluoride', smiles: 'F[Xe]F' },
  { formula: 'XeF4', name: 'Xenon Tetrafluoride', smiles: 'F[Xe](F)(F)F' },
  { formula: 'XeF6', name: 'Xenon Hexafluoride', smiles: 'F[Xe](F)(F)(F)(F)F' },
  { formula: 'RnF2', name: 'Radon Difluoride', smiles: 'F[Rn]F' },
  { formula: 'O3', name: 'Ozone', smiles: '[O-][O+]=O' },
  { formula: 'NO3-', name: 'Nitrate Ion', smiles: '[O-][N+](=O)[O-]' },
  { formula: 'SO4^2-', name: 'Sulfate Ion', smiles: '[O-]S(=O)(=O)[O-]' },
  { formula: 'PO4^3-', name: 'Phosphate Ion', smiles: '[O-]P(=O)([O-])[O-]' },
  { formula: 'CO3^2-', name: 'Carbonate Ion', smiles: '[O-]C([O-])=O' },
  { formula: 'HCO3-', name: 'Bicarbonate Ion', smiles: '[O-]C(=O)[O-]' },
  { formula: 'OH-', name: 'Hydroxide Ion', smiles: '[OH-]' },
  { formula: 'NH4+', name: 'Ammonium Ion', smiles: '[NH4+]' },
  { formula: 'H3O+', name: 'Hydronium Ion', smiles: '[OH3+]' },
  { formula: 'CN-', name: 'Cyanide Ion', smiles: '[C-]#N' },
  { formula: 'SCN-', name: 'Thiocyanate Ion', smiles: '[S-]C#N' },
  { formula: 'ClO-', name: 'Hypochlorite Ion', smiles: '[O-]Cl' },
  { formula: 'ClO2-', name: 'Chlorite Ion', smiles: '[O-]Cl=O' },
  { formula: 'ClO3-', name: 'Chlorate Ion', smiles: '[O-]Cl(=O)=O' },
  { formula: 'ClO4-', name: 'Perchlorate Ion', smiles: '[O-]Cl(=O)(=O)=O' },
  { formula: 'MnO4-', name: 'Permanganate Ion', smiles: '[O-][Mn](=O)(=O)=O' },
  { formula: 'CrO4^2-', name: 'Chromate Ion', smiles: '[O-][Cr](=O)(=O)[O-]' },
  { formula: 'Cr2O7^2-', name: 'Dichromate Ion', smiles: '[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'S2O3^2-', name: 'Thiosulfate Ion', smiles: '[O-]S(=O)(=S)[O-]' },
  { formula: 'SiO3^2-', name: 'Metasilicate Ion', smiles: '[O-][Si](=O)[O-]' },
  { formula: 'AlO2-', name: 'Aluminate Ion', smiles: '[O-][Al]=O' },
  { formula: 'BO3^3-', name: 'Borate Ion', smiles: '[O-]B([O-])[O-]' },
  { formula: 'PO3-', name: 'Metaphosphate Ion', smiles: '[O-]P=O' },
  { formula: 'AsO4^3-', name: 'Arsenate Ion', smiles: '[O-]As(=O)([O-])[O-]' },
  { formula: 'VO3-', name: 'Vanadate Ion', smiles: '[O-][V](=O)=O' },
  { formula: 'MoO4^2-', name: 'Molybdate Ion', smiles: '[O-][Mo](=O)(=O)[O-]' },
  { formula: 'WO4^2-', name: 'Tungstate Ion', smiles: '[O-][W](=O)(=O)[O-]' },
  { formula: 'TiO3^2-', name: 'Titanate Ion', smiles: '[O-][Ti](=O)[O-]' },
  { formula: 'ZrO3^2-', name: 'Zirconate Ion', smiles: '[O-][Zr](=O)[O-]' },
  { formula: 'NbO3-', name: 'Niobate Ion', smiles: '[O-][Nb](=O)=O' },
  { formula: 'TaO3-', name: 'Tantalate Ion', smiles: '[O-][Ta](=O)=O' },
  { formula: 'UO2^2+', name: 'Uranyl Ion', smiles: '[O+]=[U+4]=[O+]' },
  { formula: 'ThO2^2+', name: 'Thorium Dioxide Ion', smiles: '[O+]=[Th+4]=[O+]' },
  { formula: 'NpO2^2+', name: 'Neptunyl Ion', smiles: '[O+]=[Np+5]=[O+]' },
  { formula: 'PuO2^2+', name: 'Plutonium Dioxide Ion', smiles: '[O+]=[Pu+5]=[O+]' },
  { formula: 'AmO2^2+', name: 'Americium Dioxide Ion', smiles: '[O+]=[Am+5]=[O+]' },
  { formula: 'CmO2^2+', name: 'Curium Dioxide Ion', smiles: '[O+]=[Cm+5]=[O+]' },
  { formula: 'BkO2^2+', name: 'Berkelium Dioxide Ion', smiles: '[O+]=[Bk+5]=[O+]' },
  { formula: 'CfO2^2+', name: 'Californium Dioxide Ion', smiles: '[O+]=[Cf+5]=[O+]' },
  { formula: 'EsO2^2+', name: 'Einsteinium Dioxide Ion', smiles: '[O+]=[Es+5]=[O+]' },
  { formula: 'FmO2^2+', name: 'Fermium Dioxide Ion', smiles: '[O+]=[Fm+5]=[O+]' },
  { formula: 'MdO2^2+', name: 'Mendelevium Dioxide Ion', smiles: '[O+]=[Md+5]=[O+]' },
  { formula: 'NoO2^2+', name: 'Nobelium Dioxide Ion', smiles: '[O+]=[No+5]=[O+]' },
  { formula: 'LrO2^2+', name: 'Lawrencium Dioxide Ion', smiles: '[O+]=[Lr+5]=[O+]' },
  { formula: 'RfO2^2+', name: 'Rutherfordium Dioxide Ion', smiles: '[O+]=[Rf+5]=[O+]' },
  { formula: 'DbO2^2+', name: 'Dubnium Dioxide Ion', smiles: '[O+]=[Db+5]=[O+]' },
  { formula: 'SgO2^2+', name: 'Seaborgium Dioxide Ion', smiles: '[O+]=[Sg+5]=[O+]' },
  { formula: 'BhO2^2+', name: 'Bohrium Dioxide Ion', smiles: '[O+]=[Bh+5]=[O+]' },
  { formula: 'HsO2^2+', name: 'Hassium Dioxide Ion', smiles: '[O+]=[Hs+5]=[O+]' },
  { formula: 'MtO2^2+', name: 'Meitnerium Dioxide Ion', smiles: '[O+]=[Mt+5]=[O+]' },
  { formula: 'DsO2^2+', name: 'Darmstadtium Dioxide Ion', smiles: '[O+]=[Ds+5]=[O+]' },
  { formula: 'RgO2^2+', name: 'Roentgenium Dioxide Ion', smiles: '[O+]=[Rg+5]=[O+]' },
  { formula: 'CnO2^2+', name: 'Copernicium Dioxide Ion', smiles: '[O+]=[Cn+5]=[O+]' },
  { formula: 'NhO2^2+', name: 'Nihonium Dioxide Ion', smiles: '[O+]=[Nh+5]=[O+]' },
  { formula: 'FlO2^2+', name: 'Flerovium Dioxide Ion', smiles: '[O+]=[Fl+5]=[O+]' },
  { formula: 'McO2^2+', name: 'Moscovium Dioxide Ion', smiles: '[O+]=[Mc+5]=[O+]' },
  { formula: 'LvO2^2+', name: 'Livermorium Dioxide Ion', smiles: '[O+]=[Lv+5]=[O+]' },
  { formula: 'TsO2^2+', name: 'Tennessine Dioxide Ion', smiles: '[O+]=[Ts+5]=[O+]' },
  { formula: 'OgO2^2+', name: 'Oganesson Dioxide Ion', smiles: '[O+]=[Og+5]=[O+]' },
  { formula: 'FeO', name: 'Iron(II) Oxide', smiles: '[Fe+2].[O-2]' },
  { formula: 'CuO', name: 'Copper(II) Oxide', smiles: '[Cu+2].[O-2]' },
  { formula: 'AgCl', name: 'Silver Chloride', smiles: '[Ag+].[Cl-]' },
  { formula: 'CaO', name: 'Calcium Oxide', smiles: '[Ca+2].[O-2]' },
  { formula: 'MgO', name: 'Magnesium Oxide', smiles: '[Mg+2].[O-2]' },
  { formula: 'Na2O', name: 'Sodium Oxide', smiles: '[Na+].[Na+].[O-2]' },
  { formula: 'K2O', name: 'Potassium Oxide', smiles: '[K+].[K+].[O-2]' },
  { formula: 'Li2O', name: 'Lithium Oxide', smiles: '[Li+].[Li+].[O-2]' },
  { formula: 'BeO', name: 'Beryllium Oxide', smiles: '[Be+2].[O-2]' },
  { formula: 'B2O3', name: 'Boric Oxide', smiles: 'O=BOB=O' },
  { formula: 'CO', name: 'Carbon Monoxide', smiles: '[C-]#[O+]' },
  { formula: 'NO', name: 'Nitric Oxide', smiles: 'N=O' },
  { formula: 'SO2', name: 'Sulfur Dioxide', smiles: 'O=S=O' },
  { formula: 'SO3', name: 'Sulfur Trioxide', smiles: 'O=S(=O)=O' },
  { formula: 'H2S', name: 'Hydrogen Sulfide', smiles: 'S' },
  { formula: 'P4O10', name: 'Phosphorus Pentoxide', smiles: 'O=P12(OP3)(OP4)OP5.O=P67(OP8)(OP9)OP%10.O=P%11%12(OP%13)(OP%14)OP%15.O=P%16%17(OP%18)(OP%19)OP%20' },
  { formula: 'C2H5OH', name: 'Ethanol', smiles: 'CCO' },
  { formula: 'C6H12O6', name: 'Glucose', smiles: 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C12H22O11', name: 'Sucrose', smiles: 'OC[C@H]1O[C@@H](OC2[C@H](O)[C@@H](O)[C@H](O)O2)[C@H](O)[C@@H](O)[C@@H]1O' },
  { formula: 'C2H4', name: 'Ethylene', smiles: 'C=C' },
  { formula: 'C2H6', name: 'Ethane', smiles: 'CC' },
  { formula: 'C3H8', name: 'Propane', smiles: 'CCC' },
  { formula: 'C4H10', name: 'Butane', smiles: 'CCCC' },
  { formula: 'C6H6', name: 'Benzene', smiles: 'c1ccccc1' },
  { formula: 'CH3COOH', name: 'Acetic Acid', smiles: 'CC(=O)O' },
  { formula: 'NH4Cl', name: 'Ammonium Chloride', smiles: '[NH4+].[Cl-]' },
  { formula: 'CaCl2', name: 'Calcium Chloride', smiles: '[Ca+2].[Cl-].[Cl-]' },
  { formula: 'MgCl2', name: 'Magnesium Chloride', smiles: '[Mg+2].[Cl-].[Cl-]' },
  { formula: 'AlCl3', name: 'Aluminum Chloride', smiles: '[Al+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'FeCl3', name: 'Iron(III) Chloride', smiles: '[Fe+3].[Cl-].[Cl-].[Cl-]' },
  { formula: 'CuCl2', name: 'Copper(II) Chloride', smiles: '[Cu+2].[Cl-].[Cl-]' },
  { formula: 'ZnCl2', name: 'Zinc Chloride', smiles: '[Zn+2].[Cl-].[Cl-]' },
  { formula: 'Na2CO3', name: 'Sodium Carbonate', smiles: '[Na+].[Na+].[O-]C([O-])=O' },
  { formula: 'MgCO3', name: 'Magnesium Carbonate', smiles: '[Mg+2].[O-]C([O-])=O' },
  { formula: 'BaCO3', name: 'Barium Carbonate', smiles: '[Ba+2].[O-]C([O-])=O' },
  { formula: 'NaHCO3', name: 'Sodium Bicarbonate', smiles: '[Na+].OC([O-])=O' },
  { formula: 'KHCO3', name: 'Potassium Bicarbonate', smiles: '[K+].OC([O-])=O' },
  { formula: 'CaSO4', name: 'Calcium Sulfate', smiles: '[Ca+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'MgSO4', name: 'Magnesium Sulfate', smiles: '[Mg+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'ZnSO4', name: 'Zinc Sulfate', smiles: '[Zn+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'FeSO4', name: 'Iron(II) Sulfate', smiles: '[Fe+2].[O-]S(=O)(=O)[O-]' },
  { formula: 'Al2(SO4)3', name: 'Aluminum Sulfate', smiles: '[Al+3].[Al+3].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-]' },
  { formula: 'Na3PO4', name: 'Sodium Phosphate', smiles: '[Na+].[Na+].[Na+].[O-]P([O-])([O-])=O' },
  { formula: 'Ca3(PO4)2', name: 'Calcium Phosphate', smiles: '[Ca+2].[Ca+2].[Ca+2].[O-]P([O-])([O-])=O.[O-]P([O-])([O-])=O' },
  { formula: 'H3PO4', name: 'Phosphoric Acid', smiles: 'OP(O)(O)=O' },
  { formula: 'HNO3', name: 'Nitric Acid', smiles: 'O[N+](=O)[O-]' },
  { formula: 'HClO4', name: 'Perchloric Acid', smiles: 'OCl(=O)(=O)=O' },
  { formula: 'HCN', name: 'Hydrogen Cyanide', smiles: 'C#N' },
  { formula: 'H2O2', name: 'Hydrogen Peroxide', smiles: 'OO' },
  { formula: 'NaOCl', name: 'Sodium Hypochlorite', smiles: '[Na+].[O-]Cl' },
  { formula: 'KMnO4', name: 'Potassium Permanganate', smiles: '[K+].[O-][Mn](=O)(=O)=O' },
  { formula: 'K2Cr2O7', name: 'Potassium Dichromate', smiles: '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]' },
  { formula: 'Na2S2O3', name: 'Sodium Thiosulfate', smiles: '[Na+].[Na+].[O-]S(=O)SS(=O)[O-]' },
  { formula: 'Cu(OH)2', name: 'Copper(II) Hydroxide', smiles: '[Cu+2].[OH-].[OH-]' },
  { formula: 'Fe(OH)3', name: 'Iron(III) Hydroxide', smiles: '[Fe+3].[OH-].[OH-].[OH-]' },
  { formula: 'Al(OH)3', name: 'Aluminum Hydroxide', smiles: '[Al+3].[OH-].[OH-].[OH-]' },
  { formula: 'Ca(OH)2', name: 'Calcium Hydroxide', smiles: '[Ca+2].[OH-].[OH-]' },
  { formula: 'Mg(OH)2', name: 'Magnesium Hydroxide', smiles: '[Mg+2].[OH-].[OH-]' },
  { formula: 'KOH', name: 'Potassium Hydroxide', smiles: '[OH-].[K+]' },
  { formula: 'LiOH', name: 'Lithium Hydroxide', smiles: '[OH-].[Li+]' },
  { formula: 'Ba(OH)2', name: 'Barium Hydroxide', smiles: '[Ba+2].[OH-].[OH-]' },
  { formula: 'Sr(OH)2', name: 'Strontium Hydroxide', smiles: '[Sr+2].[OH-].[OH-]' },
  { formula: 'Be(OH)2', name: 'Beryllium Hydroxide', smiles: '[Be+2].[OH-].[OH-]' },
  { formula: 'Zn(OH)2', name: 'Zinc Hydroxide', smiles: '[Zn+2].[OH-].[OH-]' },
  { formula: 'Pb(OH)2', name: 'Lead(II) Hydroxide', smiles: '[Pb+2].[OH-].[OH-]' },
  { formula: 'Hg(OH)2', name: 'Mercury(II) Hydroxide', smiles: '[Hg+2].[OH-].[OH-]' },
  { formula: 'AgOH', name: 'Silver Hydroxide', smiles: '[Ag+].[OH-]' },
  { formula: 'CuOH', name: 'Copper(I) Hydroxide', smiles: '[Cu+].[OH-]' },
  { formula: 'FeOH', name: 'Iron(II) Hydroxide', smiles: '[Fe+].[OH-]' },
  { formula: 'Ni(OH)2', name: 'Nickel(II) Hydroxide', smiles: '[Ni+2].[OH-].[OH-]' },
  { formula: 'Co(OH)2', name: 'Cobalt(II) Hydroxide', smiles: '[Co+2].[OH-].[OH-]' },
  { formula: 'Mn(OH)2', name: 'Manganese(II) Hydroxide', smiles: '[Mn+2].[OH-].[OH-]' },
  { formula: 'Cr(OH)3', name: 'Chromium(III) Hydroxide', smiles: '[Cr+3].[OH-].[OH-].[OH-]' },
  { formula: 'Sn(OH)2', name: 'Tin(II) Hydroxide', smiles: '[Sn+2].[OH-].[OH-]' },
  { formula: 'Sb(OH)3', name: 'Antimony(III) Hydroxide', smiles: '[Sb+3].[OH-].[OH-].[OH-]' },
  { formula: 'Bi(OH)3', name: 'Bismuth(III) Hydroxide', smiles: '[Bi+3].[OH-].[OH-].[OH-]' },
  { formula: 'Ti(OH)4', name: 'Titanium(IV) Hydroxide', smiles: '[Ti+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Zr(OH)4', name: 'Zirconium(IV) Hydroxide', smiles: '[Zr+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Hf(OH)4', name: 'Hafnium(IV) Hydroxide', smiles: '[Hf+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'V(OH)4', name: 'Vanadium(IV) Hydroxide', smiles: '[V+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Nb(OH)5', name: 'Niobium(V) Hydroxide', smiles: '[Nb+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ta(OH)5', name: 'Tantalum(V) Hydroxide', smiles: '[Ta+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mo(OH)6', name: 'Molybdenum(VI) Hydroxide', smiles: '[Mo+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'W(OH)6', name: 'Tungsten(VI) Hydroxide', smiles: '[W+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'U(OH)6', name: 'Uranium(VI) Hydroxide', smiles: '[U+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Np(OH)4', name: 'Neptunium(IV) Hydroxide', smiles: '[Np+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Pu(OH)4', name: 'Plutonium(IV) Hydroxide', smiles: '[Pu+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Am(OH)3', name: 'Americium(III) Hydroxide', smiles: '[Am+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cm(OH)3', name: 'Curium(III) Hydroxide', smiles: '[Cm+3].[OH-].[OH-].[OH-]' },
  { formula: 'Bk(OH)3', name: 'Berkelium(III) Hydroxide', smiles: '[Bk+3].[OH-].[OH-].[OH-]' },
  { formula: 'Cf(OH)3', name: 'Californium(III) Hydroxide', smiles: '[Cf+3].[OH-].[OH-].[OH-]' },
  { formula: 'Es(OH)3', name: 'Einsteinium(III) Hydroxide', smiles: '[Es+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fm(OH)3', name: 'Fermium(III) Hydroxide', smiles: '[Fm+3].[OH-].[OH-].[OH-]' },
  { formula: 'Md(OH)3', name: 'Mendelevium(III) Hydroxide', smiles: '[Md+3].[OH-].[OH-].[OH-]' },
  { formula: 'No(OH)3', name: 'Nobelium(III) Hydroxide', smiles: '[No+3].[OH-].[OH-].[OH-]' },
  { formula: 'Lr(OH)3', name: 'Lawrencium(III) Hydroxide', smiles: '[Lr+3].[OH-].[OH-].[OH-]' },
  { formula: 'Rf(OH)4', name: 'Rutherfordium(IV) Hydroxide', smiles: '[Rf+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Db(OH)5', name: 'Dubnium(V) Hydroxide', smiles: '[Db+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Sg(OH)6', name: 'Seaborgium(VI) Hydroxide', smiles: '[Sg+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Bh(OH)7', name: 'Bohrium(VII) Hydroxide', smiles: '[Bh+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Hs(OH)8', name: 'Hassium(VIII) Hydroxide', smiles: '[Hs+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mt(OH)9', name: 'Meitnerium(IX) Hydroxide', smiles: '[Mt+9].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ds(OH)10', name: 'Darmstadtium(X) Hydroxide', smiles: '[Ds+10].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Rg(OH)11', name: 'Roentgenium(XI) Hydroxide', smiles: '[Rg+11].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Cn(OH)2', name: 'Copernicium(II) Hydroxide', smiles: '[Cn+2].[OH-].[OH-]' },
  { formula: 'Nh(OH)3', name: 'Nihonium(III) Hydroxide', smiles: '[Nh+3].[OH-].[OH-].[OH-]' },
  { formula: 'Fl(OH)4', name: 'Flerovium(IV) Hydroxide', smiles: '[Fl+4].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Mc(OH)5', name: 'Moscovium(V) Hydroxide', smiles: '[Mc+5].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Lv(OH)6', name: 'Livermorium(VI) Hydroxide', smiles: '[Lv+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Ts(OH)7', name: 'Tennessine(VII) Hydroxide', smiles: '[Ts+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
  { formula: 'Og(OH)8', name: 'Oganesson(VIII) Hydroxide', smiles: '[Og+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]' },
];

export const reactions: Reaction[] = [
  // WATER + METAL REACTIONS
  { id:'h2o-li', reactants:['H2O','Li'], eq:'H₂O + Li → LiOH + H₂', balanced:'2H₂O + 2Li → 2LiOH + H₂↑', products:['LiOH','H2'], type:'single-replacement', visual:'explosion', color:'hsl(200,70%,60%)', enthalpy:-222.0, desc:'Lithium reacts violently with water producing hydrogen.', safety:'⚠️ VIOLENT! Never touch!', temp:'Spontaneous', realUse:'Hydrogen generation, reactivity studies', smiles:'[Li+].[OH-]' },
  { id:'h2o-na', reactants:['H2O','Na'], eq:'H₂O + Na → NaOH + H₂', balanced:'2H₂O + 2Na → 2NaOH + H₂↑', products:['NaOH','H2'], type:'single-replacement', visual:'fire', color:'hsl(45,100%,60%)', enthalpy:-184.0, desc:'Sodium reacts vigorously with water producing yellow-orange flame.', safety:'⚠️ VIOLENT! Never touch!', temp:'Spontaneous', realUse:'NaOH production, metal analysis', smiles:'[Na+].[OH-]' },
  { id:'h2o-k', reactants:['H2O','K'], eq:'H₂O + K → KOH + H₂', balanced:'2H₂O + 2K → 2KOH + H₂↑', products:['KOH','H2'], type:'single-replacement', visual:'explosion', color:'hsl(280,60%,65%)', enthalpy:-196.0, desc:'Potassium explodes in water with lilac/explosive flame.', safety:'⚠️ CATASTROPHIC!', temp:'Spontaneous', realUse:'KOH production, reactivity demo', smiles:'[K+].[OH-]' },
  { id:'h2o-ca', reactants:['H2O','Ca'], eq:'H₂O + Ca → Ca(OH)₂ + H₂', balanced:'Ca + 2H₂O → Ca(OH)₂ + H₂↑', products:['Ca(OH)2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(180,40%,60%)', enthalpy:-109.0, desc:'Calcium reacts slowly with water producing hydrogen bubbles.', temp:'Room temp (slow)', realUse:'Hydrogen generation, water softening', smiles:'[Ca+2].[OH-].[OH-]' },
  { id:'h2o-mg', reactants:['H2O','Mg'], eq:'H₂O + Mg → Mg(OH)₂ + H₂', balanced:'Mg + 2H₂O → Mg(OH)₂ + H₂↑', products:['Mg(OH)2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(120,50%,55%)', enthalpy:-83.0, desc:'Magnesium reacts with steam producing hydrogen.', temp:'~100°C', realUse:'Hydrogen generation, metal extraction', smiles:'[Mg+2].[OH-].[OH-]' },

  // ACID + METAL REACTIONS
  { id:'hcl-na', reactants:['HCl','Na'], eq:'HCl + Na → NaCl + H₂', balanced:'2HCl + 2Na → 2NaCl + H₂↑', products:['NaCl','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(45,90%,70%)', enthalpy:-191.0, desc:'Sodium dissolves in acid producing hydrogen.', safety:'⚠️ Violent reaction!', temp:'Room temp', realUse:'Salt production, hydrogen generation', smiles:'[Na+].[Cl-]' },
  { id:'hcl-k', reactants:['HCl','K'], eq:'HCl + K → KCl + H₂', balanced:'2HCl + 2K → 2KCl + H₂↑', products:['KCl','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(280,60%,65%)', enthalpy:-202.0, desc:'Potassium dissolves in acid producing hydrogen.', safety:'⚠️ Violent reaction!', temp:'Room temp', realUse:'Hydrogen generation, salt production', smiles:'[K+].[Cl-]' },
  { id:'hcl-ca', reactants:['HCl','Ca'], eq:'HCl + Ca → CaCl₂ + H₂', balanced:'2HCl + Ca → CaCl₂ + H₂↑', products:['CaCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(180,40%,60%)', enthalpy:-144.0, desc:'Calcium dissolves in acid producing hydrogen.', temp:'Room temp', realUse:'Hydrogen generation, calcium chloride production', smiles:'[Ca+2].[Cl-].[Cl-]' },
  { id:'hcl-mg', reactants:['HCl','Mg'], eq:'HCl + Mg → MgCl₂ + H₂', balanced:'2HCl + Mg → MgCl₂ + H₂↑', products:['MgCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(120,50%,55%)', enthalpy:-111.0, desc:'Magnesium dissolves in acid producing hydrogen.', temp:'Room temp', realUse:'Hydrogen generation, magnesium chloride production', smiles:'[Mg+2].[Cl-].[Cl-]' },
  { id:'hcl-zn', reactants:['HCl','Zn'], eq:'HCl + Zn → ZnCl₂ + H₂', balanced:'2HCl + Zn → ZnCl₂ + H₂↑', products:['ZnCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(180,20%,60%)', enthalpy:-153.9, desc:'Zinc dissolves in acid producing hydrogen bubbles.', temp:'Room temp', realUse:'Hydrogen generation, galvanizing', smiles:'[Zn+2].[Cl-].[Cl-]' },
  { id:'hcl-fe', reactants:['HCl','Fe'], eq:'HCl + Fe → FeCl₂ + H₂', balanced:'2HCl + Fe → FeCl₂ + H₂↑', products:['FeCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(15,40%,50%)', enthalpy:-87.9, desc:'Iron dissolves in acid producing hydrogen.', temp:'Room temp', realUse:'Steel pickling, hydrogen generation', smiles:'[Fe+2].[Cl-].[Cl-]' },
  { id:'hcl-al', reactants:['HCl','Al'], eq:'HCl + Al → AlCl₃ + H₂', balanced:'6HCl + 2Al → 2AlCl₃ + 3H₂↑', products:['AlCl3','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(200,30%,70%)', enthalpy:-104.0, desc:'Aluminum dissolves in acid producing hydrogen.', temp:'Room temp', realUse:'Aluminum etching, hydrogen generation', smiles:'[Al+3].[Cl-].[Cl-].[Cl-]' },

  // ACID-BASE NEUTRALIZATION REACTIONS
  { id:'hcl-naoh', reactants:['HCl','NaOH'], eq:'HCl + NaOH → NaCl + H₂O', balanced:'HCl + NaOH → NaCl + H₂O', products:['NaCl','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-55.8, desc:'Neutralization: acid + base → salt + water.', temp:'Room temp', realUse:'pH control, salt production', smiles:'[Na+].[Cl-]' },
  { id:'hcl-koh', reactants:['HCl','KOH'], eq:'HCl + KOH → KCl + H₂O', balanced:'HCl + KOH → KCl + H₂O', products:['KCl','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(280,50%,60%)', enthalpy:-57.3, desc:'Potassium hydroxide neutralizes hydrochloric acid.', temp:'Room temp', realUse:'Salt production, pH control', smiles:'[K+].[Cl-]' },
  { id:'hcl-caoh2', reactants:['HCl','Ca(OH)2'], eq:'HCl + Ca(OH)₂ → CaCl₂ + H₂O', balanced:'2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O', products:['CaCl2','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(180,40%,60%)', enthalpy:-114.0, desc:'Calcium hydroxide neutralizes hydrochloric acid.', temp:'Room temp', realUse:'Water treatment, antacid', smiles:'[Ca+2].[Cl-].[Cl-]' },
  { id:'hcl-mgoh2', reactants:['HCl','Mg(OH)2'], eq:'HCl + Mg(OH)₂ → MgCl₂ + H₂O', balanced:'2HCl + Mg(OH)₂ → MgCl₂ + 2H₂O', products:['MgCl2','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(120,50%,60%)', enthalpy:-106.0, desc:'Magnesium hydroxide neutralizes hydrochloric acid.', temp:'Room temp', realUse:'Antacid production', smiles:'[Mg+2].[Cl-].[Cl-]' },
  { id:'h2so4-naoh', reactants:['H2SO4','NaOH'], eq:'H₂SO₄ + NaOH → NaHSO₄ + H₂O', balanced:'H₂SO₄ + NaOH → NaHSO₄ + H₂O', products:['NaHSO4','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(45,60%,70%)', enthalpy:-57.3, desc:'Partial neutralization of sulfuric acid.', temp:'Room temp', realUse:'pH control, detergents', smiles:'[Na+].OS(=O)(=O)[O-]' },
  { id:'h2so4-caoh2', reactants:['H2SO4','Ca(OH)2'], eq:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', balanced:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', products:['CaSO4','H2O'], type:'acid-base', visual:'precipitate', color:'hsl(0,0%,90%)', enthalpy:-106.7, desc:'Calcium hydroxide neutralizes sulfuric acid.', temp:'Room temp', realUse:'Gypsum production, water treatment', smiles:'[Ca+2].OS(=O)(=O)[O-]' },
  { id:'h2so4-mgoh2', reactants:['H2SO4','Mg(OH)2'], eq:'H₂SO₄ + Mg(OH)₂ → MgSO₄ + 2H₂O', balanced:'H₂SO₄ + Mg(OH)₂ → MgSO₄ + 2H₂O', products:['MgSO4','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(120,50%,60%)', enthalpy:-106.0, desc:'Magnesium hydroxide neutralizes sulfuric acid.', temp:'Room temp', realUse:'Magnesium sulfate production, antacid', smiles:'[Mg+2].OS(=O)(=O)[O-]' },
  { id:'hno3-naoh', reactants:['HNO3','NaOH'], eq:'HNO₃ + NaOH → NaNO₃ + H₂O', balanced:'HNO₃ + NaOH → NaNO₃ + H₂O', products:['NaNO3','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(45,60%,70%)', enthalpy:-57.3, desc:'Nitric acid neutralizes sodium hydroxide.', temp:'Room temp', realUse:'Fertilizer production', smiles:'[Na+].[O-][N+](=O)[O-]' },
  { id:'hno3-koh', reactants:['HNO3','KOH'], eq:'HNO₃ + KOH → KNO₃ + H₂O', balanced:'HNO₃ + KOH → KNO₃ + H₂O', products:['KNO3','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(280,50%,60%)', enthalpy:-57.3, desc:'Potassium hydroxide neutralizes nitric acid.', temp:'Room temp', realUse:'Salt production, explosives', smiles:'[K+].[O-][N+](=O)[O-]' },

  // CARBONATE + ACID REACTIONS
  { id:'caco3-hcl', reactants:['CaCO3','HCl'], eq:'CaCO₃ + HCl → CaCl₂ + H₂O + CO₂', balanced:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑', products:['CaCl2','H2O','CO2'], type:'acid-base', visual:'effervescence', color:'hsl(180,40%,60%)', enthalpy:-15.0, desc:'Carbonate reacts with acid producing CO₂ gas.', temp:'Room temp', realUse:'Limestone caves, digestion', smiles:'[Ca+2].[Cl-].[Cl-]' },
  { id:'caco3-h2so4', reactants:['CaCO3','H2SO4'], eq:'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂', balanced:'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑', products:['CaSO4','H2O','CO2'], type:'acid-base', visual:'effervescence', color:'hsl(0,0%,90%)', enthalpy:-16.0, desc:'Sulfuric acid reacts with limestone.', temp:'Room temp', realUse:'Gypsum production, mining', smiles:'[Ca+2].OS(=O)(=O)[O-]' },
  { id:'caco3-hno3', reactants:['CaCO3','HNO3'], eq:'CaCO₃ + HNO₃ → Ca(NO₃)₂ + H₂O + CO₂', balanced:'CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂↑', products:['Ca(NO3)2','H2O','CO2'], type:'acid-base', visual:'effervescence', color:'hsl(45,60%,70%)', enthalpy:-15.0, desc:'Nitric acid dissolves calcium carbonate.', temp:'Room temp', realUse:'Fertilizer production', smiles:'[Ca+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { id:'mgco3-hcl', reactants:['MgCO3','HCl'], eq:'MgCO₃ + HCl → MgCl₂ + H₂O + CO₂', balanced:'MgCO₃ + 2HCl → MgCl₂ + H₂O + CO₂↑', products:['MgCl2','H2O','CO2'], type:'acid-base', visual:'effervescence', color:'hsl(120,50%,55%)', enthalpy:-15.0, desc:'Magnesium carbonate reacts with acid.', temp:'Room temp', realUse:'Antacid production', smiles:'[Mg+2].[Cl-].[Cl-]' },
  { id:'naco3-hcl', reactants:['Na2CO3','HCl'], eq:'Na₂CO₃ + HCl → NaHCO₃ + NaCl', balanced:'Na₂CO₃ + HCl → NaHCO₃ + NaCl', products:['NaHCO3','NaCl'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-28.0, desc:'Partial neutralization of sodium carbonate.', temp:'Room temp', realUse:'Baking soda production', smiles:'[Na+].[Na+].[Cl-]' },

  // PRECIPITATION REACTIONS
  { id:'agno3-nacl', reactants:['AgNO3','NaCl'], eq:'AgNO₃ + NaCl → AgCl + NaNO₃', balanced:'AgNO₃ + NaCl → AgCl↓ + NaNO₃', products:['AgCl','NaNO3'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-33.4, desc:'Double replacement forms insoluble AgCl.', temp:'Room temp', realUse:'Qualitative analysis, photography', smiles:'[Ag+].[Cl-]' },
  { id:'pbno32-nacl', reactants:['Pb(NO3)2','NaCl'], eq:'Pb(NO₃)₂ + NaCl → PbCl₂ + NaNO₃', balanced:'Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃', products:['PbCl2','NaNO3'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,80%)', enthalpy:-26.8, desc:'Lead chloride precipitates from solution.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Research, pigments', smiles:'[Pb+2].[Cl-].[Cl-]' },
  { id:'bacl2-na2so4', reactants:['BaCl2','Na2SO4'], eq:'BaCl₂ + Na₂SO₄ → BaSO₄ + NaCl', balanced:'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', products:['BaSO4','NaCl'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,95%)', enthalpy:-35.7, desc:'Barium sulfate forms white precipitate.', temp:'Room temp', realUse:'X-ray contrast, paints', smiles:'[Ba+2].OS(=O)(=O)[O-]' },
  { id:'cacl2-na2co3', reactants:['CaCl2','Na2CO3'], eq:'CaCl₂ + Na₂CO₃ → CaCO₃ + NaCl', balanced:'CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl', products:['CaCO3','NaCl'], type:'precipitation', visual:'precipitate', color:'hsl(180,40%,60%)', enthalpy:-12.6, desc:'Calcium carbonate precipitates.', temp:'Room temp', realUse:'Water softening, chalk production', smiles:'[Ca+2].[O-]C([O-])=O' },
  { id:'znso4-na2s', reactants:['ZnSO4','Na2S'], eq:'ZnSO₄ + Na₂S → ZnS + Na₂SO₄', balanced:'ZnSO₄ + Na₂S → ZnS↓ + Na₂SO₄', products:['ZnS','Na2SO4'], type:'precipitation', visual:'precipitate', color:'hsl(60,60%,60%)', enthalpy:-24.7, desc:'Zinc sulfide forms white precipitate.', temp:'Room temp', realUse:'Phosphors, pigments', smiles:'[Zn+2].[S-2]' },

  // REDOX REACTIONS
  { id:'kmno4-feso4', reactants:['KMnO4','FeSO4'], eq:'KMnO₄ + FeSO₄ → MnO₂ + Fe₂(SO₄)₃ + K₂SO₄', balanced:'2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 2MnSO₄ + 5Fe₂(SO₄)₃ + K₂SO₄ + 8H₂O', products:['MnO2','Fe2(SO4)3','K2SO4'], type:'redox', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-165.0, desc:'Potassium permanganate oxidizes iron(II).', temp:'Room temp', realUse:'Analytical chemistry, water treatment', smiles:'[Mn+4].[O-2].[O-2]' },
  { id:'h2o2-mno2', reactants:['H2O2','MnO2'], eq:'H₂O₂ + MnO₂ → MnO₄⁻ + H₂O', balanced:'3H₂O₂ + 2MnO₂ → 2MnO₄⁻ + 2H₂O + 2H⁺', products:['MnO4-','H2O'], type:'redox', visual:'color-change', color:'hsl(300,60%,50%)', enthalpy:-76.0, desc:'Hydrogen peroxide oxidizes manganese dioxide.', temp:'Room temp', realUse:'Rocket fuel, bleaching', smiles:'[Mn+7].[O-].[O-].[O-].[O-]' },
  { id:'cu2-ag', reactants:['CuSO4','Ag'], eq:'Cu²⁺ + Ag → Cu + Ag⁺', balanced:'Cu²⁺ + 2Ag → Cu + 2Ag⁺', products:['Cu','Ag+'], type:'redox', visual:'precipitate', color:'hsl(45,80%,60%)', enthalpy:-146.0, desc:'Copper displaces silver from solution.', temp:'Room temp', realUse:'Silver recovery, electroplating', smiles:'[Cu]' },

  // COMBUSTION REACTIONS
  { id:'ch4-o2', reactants:['CH4','O2'], eq:'CH₄ + O₂ → CO₂ + H₂O', balanced:'CH₄ + 2O₂ → CO₂ + 2H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-890.4, desc:'Methane combustion — natural gas burning.', temp:'Ignition ~595°C', realUse:'Heating, cooking, energy', smiles:'O=C=O' },
  { id:'c-o2', reactants:['C','O2'], eq:'C + O₂ → CO₂', balanced:'C + O₂ → CO₂', products:['CO2'], type:'combustion', visual:'glow', color:'hsl(0,0%,20%)', enthalpy:-393.5, desc:'Carbon burns to form carbon dioxide.', temp:'Ignition ~700°C', realUse:'Steel production, respiration', smiles:'O=C=O' },
  { id:'h2-o2', reactants:['H2','O2'], eq:'H₂ + O₂ → H₂O', balanced:'2H₂ + O₂ → 2H₂O', products:['H2O'], type:'combustion', visual:'explosion', color:'hsl(200,80%,60%)', enthalpy:-285.8, desc:'Hydrogen combusts in oxygen producing water. Extremely exothermic.', safety:'⚠️ EXPLOSIVE mixture!', temp:'Ignition ~500°C', realUse:'Rocket fuel, fuel cells, energy', smiles:'O' },
  { id:'co-o2', reactants:['CO','O2'], eq:'CO + O₂ → CO₂', balanced:'2CO + O₂ → 2CO₂', products:['CO2'], type:'combustion', visual:'fire', color:'hsl(0,0%,90%)', enthalpy:-283.0, desc:'Carbon monoxide burns to carbon dioxide.', safety:'⚠️ CO is toxic!', temp:'Room temp', realUse:'Industrial furnaces', smiles:'O=C=O' },
  { id:'c2h5oh-o2', reactants:['C2H5OH','O2'], eq:'C₂H₅OH + O₂ → CO₂ + H₂O', balanced:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(45,60%,70%)', enthalpy:-1367.0, desc:'Ethanol combustion — alcohol burning.', temp:'Ignition ~365°C', realUse:'Biofuels, spirits', smiles:'O=C=O' },

  // DECOMPOSITION REACTIONS
  { id:'h2o2-decomp', reactants:['H2O2'], eq:'H₂O₂ → H₂O + O₂', balanced:'2H₂O₂ → 2H₂O + O₂↑', products:['H2O','O2'], type:'decomposition', visual:'bubbles', color:'hsl(200,50%,70%)', enthalpy:196.0, desc:'Hydrogen peroxide decomposes to water and oxygen.', catalyst:'MnO₂ or enzyme', temp:'Room temp', realUse:'Disinfectant, bleaching', smiles:'O=O' },
  { id:'caco3-decomp', reactants:['CaCO3'], eq:'CaCO₃ → CaO + CO₂', balanced:'CaCO₃ → CaO + CO₂↑', products:['CaO','CO2'], type:'decomposition', visual:'effervescence', color:'hsl(0,0%,85%)', enthalpy:178.0, desc:'Limestone decomposes to lime and carbon dioxide.', temp:'~900°C', realUse:'Cement production, lime kilns', smiles:'O=[Ca]' },
  { id:'nacl-decomp', reactants:['NaCl'], eq:'NaCl → Na + Cl₂', balanced:'2NaCl → 2Na + Cl₂↑', products:['Na','Cl2'], type:'decomposition', visual:'spark', color:'hsl(45,90%,70%)', enthalpy:411.0, desc:'Electrolysis of sodium chloride.', temp:'Molten salt electrolysis', realUse:'Chlorine production, sodium metal', smiles:'[Na]' },
  { id:'h2so4-decomp', reactants:['H2SO4'], eq:'H₂SO₄ → SO₃ + H₂O', balanced:'H₂SO₄ → SO₃ + H₂O', products:['SO3','H2O'], type:'decomposition', visual:'vapor', color:'hsl(45,60%,70%)', enthalpy:132.0, desc:'Sulfuric acid decomposes on heating.', temp:'~300°C', realUse:'Oleum production', smiles:'O=S(=O)=O' },

  // SYNTHESIS REACTIONS
  { id:'h2-s', reactants:['H2','S'], eq:'H₂ + S → H₂S', balanced:'H₂ + S → H₂S', products:['H2S'], type:'synthesis', visual:'gas-release', color:'hsl(120,60%,45%)', enthalpy:-20.6, desc:'Hydrogen and sulfur form toxic rotten-egg gas.', safety:'⚠️ H₂S is toxic!', temp:'>100°C', realUse:'Analytical chemistry, waste treatment', smiles:'S' },
  { id:'n2-h2', reactants:['N2','H2'], eq:'N₂ + H₂ → NH₃', balanced:'N₂ + 3H₂ ⇌ 2NH₃', products:['NH3'], type:'synthesis', visual:'smoke', color:'hsl(200,30%,70%)', enthalpy:-92.2, desc:'Haber process — feeds billions through fertilizers! Industrial scale.', catalyst:'Iron catalyst', temp:'400-500°C, 150-300 atm', realUse:'Fertilizers, explosives, coolant', smiles:'N' },
  { id:'co-h2', reactants:['CO','H2'], eq:'CO + H₂ → CH₃OH', balanced:'CO + 2H₂ → CH₃OH', products:['CH3OH'], type:'synthesis', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-90.7, desc:'Methanol synthesis from syngas.', catalyst:'Cu/ZnO/Al₂O₃', temp:'200-300°C, 50-100 atm', realUse:'Fuel production, chemicals', smiles:'CO' },
  { id:'ca-oh2', reactants:['Ca','O2'], eq:'Ca + O₂ → CaO', balanced:'2Ca + O₂ → 2CaO', products:['CaO'], type:'oxidation', visual:'glow', color:'hsl(0,0%,85%)', enthalpy:-635.0, desc:'Calcium burns in air forming calcium oxide.', temp:'~300°C', realUse:'Cement, steelmaking', smiles:'O=[Ca]' },
  { id:'mg-o2', reactants:['Mg','O2'], eq:'Mg + O₂ → MgO', balanced:'2Mg + O₂ → 2MgO', products:['MgO'], type:'combustion', visual:'glow', color:'hsl(0,0%,95%)', enthalpy:-601.6, desc:'Magnesium burns with intense white flame producing MgO.', safety:'⚠️ Very bright! Do NOT look!', temp:'Ignition ~473°C', realUse:'Fireworks, flares, insulation', smiles:'O=[Mg]' },

  // METAL HALIDE FORMATION
  { id:'na-cl2', reactants:['Na','Cl2'], eq:'Na + Cl₂ → NaCl', balanced:'2Na + Cl₂ → 2NaCl', products:['NaCl'], type:'synthesis', visual:'spark', color:'hsl(45,90%,70%)', enthalpy:-411.2, desc:'Sodium reacts vigorously with chlorine gas forming sodium chloride.', safety:'⚠️ Violent! Cl₂ is toxic.', temp:'~250°C', realUse:'Table salt, brine electrolysis', smiles:'[Na+].[Cl-]' },
  { id:'k-cl2', reactants:['K','Cl2'], eq:'K + Cl₂ → KCl', balanced:'2K + Cl₂ → 2KCl', products:['KCl'], type:'synthesis', visual:'spark', color:'hsl(280,50%,55%)', enthalpy:-436.7, desc:'Potassium reacts with chlorine forming KCl.', safety:'⚠️ Very violent!', temp:'Room temp', realUse:'Fertilizer, salt substitute', smiles:'[K+].[Cl-]' },
  { id:'ca-cl2', reactants:['Ca','Cl2'], eq:'Ca + Cl₂ → CaCl₂', balanced:'Ca + Cl₂ → CaCl₂', products:['CaCl2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-795.8, desc:'Calcium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'De-icing, food additive', smiles:'[Ca+2].[Cl-].[Cl-]' },
  { id:'mg-cl2', reactants:['Mg','Cl2'], eq:'Mg + Cl₂ → MgCl₂', balanced:'Mg + Cl₂ → MgCl₂', products:['MgCl2'], type:'synthesis', visual:'spark', color:'hsl(120,50%,55%)', enthalpy:-641.3, desc:'Magnesium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Magnesium chloride production', smiles:'[Mg+2].[Cl-].[Cl-]' },
  { id:'al-cl2', reactants:['Al','Cl2'], eq:'Al + Cl₂ → AlCl₃', balanced:'2Al + 3Cl₂ → 2AlCl₃', products:['AlCl3'], type:'synthesis', visual:'spark', color:'hsl(200,30%,70%)', enthalpy:-1407.0, desc:'Aluminum reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Catalysis, aluminum chloride production', smiles:'[Al+3].[Cl-].[Cl-].[Cl-]' },

  // DOUBLE REPLACEMENT REACTIONS
  { id:'nacl-agno3', reactants:['NaCl','AgNO3'], eq:'NaCl + AgNO₃ → NaNO₃ + AgCl', balanced:'NaCl + AgNO₃ → NaNO₃ + AgCl↓', products:['NaNO3','AgCl'], type:'double-replacement', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-33.4, desc:'Silver chloride precipitates in double replacement.', temp:'Room temp', realUse:'Qualitative analysis, photography', smiles:'[Ag+].[Cl-]' },
  { id:'nacl-pbno32', reactants:['NaCl','Pb(NO3)2'], eq:'NaCl + Pb(NO₃)₂ → NaNO₃ + PbCl₂', balanced:'2NaCl + Pb(NO₃)₂ → 2NaNO₃ + PbCl₂↓', products:['NaNO3','PbCl2'], type:'double-replacement', visual:'precipitate', color:'hsl(0,0%,80%)', enthalpy:-26.8, desc:'Lead chloride forms white precipitate.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Research, qualitative analysis', smiles:'[Pb+2].[Cl-].[Cl-]' },
  { id:'nacl-bacl2', reactants:['NaCl','BaCl2'], eq:'NaCl + BaCl₂ → No reaction', balanced:'NaCl + BaCl₂ → No reaction', products:[], type:'double-replacement', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:0, desc:'No reaction — all ions remain in solution.', temp:'Room temp', realUse:'Solubility rules demonstration' },
  { id:'na2so4-bacl2', reactants:['Na2SO4','BaCl2'], eq:'Na₂SO₄ + BaCl₂ → BaSO₄ + NaCl', balanced:'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl', products:['BaSO4','NaCl'], type:'double-replacement', visual:'precipitate', color:'hsl(0,0%,95%)', enthalpy:-35.7, desc:'Barium sulfate precipitates.', temp:'Room temp', realUse:'X-ray contrast, gravimetric analysis', smiles:'[Ba+2].OS(=O)(=O)[O-]' },
  { id:'na2co3-cacl2', reactants:['Na2CO3','CaCl2'], eq:'Na₂CO₃ + CaCl₂ → CaCO₃ + NaCl', balanced:'Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl', products:['CaCO3','NaCl'], type:'double-replacement', visual:'precipitate', color:'hsl(180,40%,60%)', enthalpy:-12.6, desc:'Calcium carbonate precipitates.', temp:'Room temp', realUse:'Water softening, scale formation', smiles:'[Ca+2].[O-]C([O-])=O' },

  // COMPLEX FORMATION
  { id:'nh4cl-naoh', reactants:['NH4Cl','NaOH'], eq:'NH₄Cl + NaOH → NH₃ + NaCl + H₂O', balanced:'NH₄Cl + NaOH → NH₃↑ + NaCl + H₂O', products:['NH3','NaCl','H2O'], type:'acid-base', visual:'gas-release', color:'hsl(200,30%,70%)', enthalpy:-3.6, desc:'Ammonia gas is released from ammonium salt.', temp:'Room temp', realUse:'Ammonia detection, qualitative analysis', smiles:'N' },
  { id:'cu-hno3', reactants:['Cu','HNO3'], eq:'Cu + HNO₃ → Cu(NO₃)₂ + NO₂ + H₂O', balanced:'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂↑ + 2H₂O', products:['Cu(NO3)2','NO2','H2O'], type:'redox', visual:'color-change', color:'hsl(0,60%,50%)', enthalpy:-145.0, desc:'Copper dissolves in nitric acid with brown NO₂ gas.', safety:'⚠️ NO₂ is toxic!', temp:'Room temp', realUse:'Copper nitrate production', smiles:'[Cu+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },
  { id:'zn-hno3', reactants:['Zn','HNO3'], eq:'Zn + HNO₃ → Zn(NO₃)₂ + N₂O + H₂O', balanced:'4Zn + 10HNO₃ → 4Zn(NO₃)₂ + N₂O↑ + 5H₂O', products:['Zn(NO3)2','N2O','H2O'], type:'redox', visual:'gas-release', color:'hsl(180,20%,60%)', enthalpy:-240.0, desc:'Zinc reduces nitric acid to nitrous oxide.', temp:'Room temp', realUse:'Nitrous oxide production', smiles:'[Zn+2].[O-][N+](=O)[O-].[O-][N+](=O)[O-]' },

  // ORGANIC REACTIONS
  { id:'ch3cooh-naoh', reactants:['CH3COOH','NaOH'], eq:'CH₃COOH + NaOH → CH₃COONa + H₂O', balanced:'CH₃COOH + NaOH → CH₃COONa + H₂O', products:['CH3COONa','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(45,60%,70%)', enthalpy:-55.2, desc:'Acetic acid neutralizes sodium hydroxide.', temp:'Room temp', realUse:'Vinegar neutralization, soap making', smiles:'[Na+].[O-]C(=O)C' },
  { id:'c6h12o6-o2', reactants:['C6H12O6','O2'], eq:'C₆H₁₂O₆ + O₂ → CO₂ + H₂O', balanced:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-2808.0, desc:'Glucose combustion — cellular respiration.', temp:'Body temp ~37°C', realUse:'Energy production, metabolism', smiles:'O=C=O' },
  { id:'c2h5oh-h2so4', reactants:['C2H5OH','H2SO4'], eq:'C₂H₅OH + H₂SO₄ → C₂H₄ + H₂SO₄·H₂O', balanced:'C₂H₅OH → C₂H₄↑ + H₂O', products:['C2H4','H2SO4·H2O'], type:'dehydration', visual:'vapor', color:'hsl(45,60%,70%)', enthalpy:45.0, desc:'Ethanol dehydrates to ethylene.', catalyst:'H₂SO₄', temp:'140-170°C', realUse:'Plastic production, ripening', smiles:'C=C' },

  // SPECIAL REACTIONS
  { id:'h2o-co2', reactants:['H2O','CO2'], eq:'H₂O + CO₂ ⇌ H₂CO₃', balanced:'H₂O + CO₂ ⇌ H₂CO₃', products:['H2CO3'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-20.3, desc:'Carbon dioxide dissolves in water forming carbonic acid.', temp:'Room temp', realUse:'Ocean acidification, soda production', smiles:'O=C(O)O' },
  { id:'na2co3-co2', reactants:['Na2CO3','CO2'], eq:'Na₂CO₃ + CO₂ + H₂O → NaHCO₃', balanced:'Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃', products:['NaHCO3'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-36.0, desc:'Sodium carbonate absorbs CO₂ forming bicarbonate.', temp:'Room temp', realUse:'Fire extinguishers, baking soda', smiles:'[Na+].[Na+].[O-]C(=O)[O-]' },
  { id:'ca-oh2-co2', reactants:['Ca(OH)2','CO2'], eq:'Ca(OH)₂ + CO₂ → CaCO₃ + H₂O', balanced:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O', products:['CaCO3','H2O'], type:'acid-base', visual:'precipitate', color:'hsl(180,40%,60%)', enthalpy:-113.0, desc:'Lime water turns milky with CO₂.', temp:'Room temp', realUse:'CO₂ detection, cement setting', smiles:'[Ca+2].[O-]C([O-])=O' },

  // NOBLE GAS COMPOUNDS
  { id:'xe-f2', reactants:['Xe','F2'], eq:'Xe + F₂ → XeF₂', balanced:'Xe + F₂ → XeF₂', products:['XeF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-108.0, desc:'Xenon reacts with fluorine — noble gas compound!', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, oxidizers', smiles:'F[Xe]F' },
  { id:'xe-2f2', reactants:['Xe','F2'], eq:'Xe + 2F₂ → XeF₄', balanced:'Xe + 2F₂ → XeF₄', products:['XeF4'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-251.0, desc:'Xenon forms XeF₄ with excess fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, fluorinating agent', smiles:'F[Xe](F)(F)F' },
  { id:'xe-3f2', reactants:['Xe','F2'], eq:'Xe + 3F₂ → XeF₆', balanced:'Xe + 3F₂ → XeF₆', products:['XeF6'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-294.0, desc:'Xenon forms XeF₆ — highest oxidation state noble gas compound.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, superconductors', smiles:'F[Xe](F)(F)(F)(F)F' },

  // SUPERHEAVY ELEMENTS
  { id:'unununium-o2', reactants:['Uuu','O2'], eq:'Uuu + O₂ → UuuO₂', balanced:'Uuu + O₂ → UuuO₂', products:['Unununium Dioxide'], type:'oxidation', visual:'glow', color:'hsl(300,60%,50%)', enthalpy:-500.0, desc:'Theoretical oxidation of element 111.', temp:'High temp', realUse:'Research, nuclear physics' },
  { id:'feo2', reactants:['Fe','O2'], eq:'Fe + O₂ → Fe₂O₃', balanced:'4Fe + 3O₂ → 2Fe₂O₃', products:['Fe2O3'], type:'oxidation', visual:'color-change', color:'hsl(15,70%,45%)', enthalpy:-824.2, desc:'Iron oxidizes forming rust — iron(III) oxide.', temp:'Room temp (slow)', realUse:'Understanding corrosion, air quality' },
  { id:'fes', reactants:['Fe','S'], eq:'Fe + S → FeS', balanced:'Fe + S → FeS', products:['FeS'], type:'synthesis', visual:'glow', color:'hsl(45,40%,30%)', enthalpy:-100.0, desc:'Iron and sulfur combine when heated, releasing heat.', safety:'⚠️ Exothermic!', temp:'~600°C', realUse:'Teaching chemical bonds, compound formation' },
  { id:'fecl3', reactants:['Fe','Cl2'], eq:'Fe + Cl₂ → FeCl₃', balanced:'2Fe + 3Cl₂ → 2FeCl₃', products:['FeCl3'], type:'synthesis', visual:'smoke', color:'hsl(35,60%,40%)', enthalpy:-399.5, desc:'Iron reacts with chlorine gas forming brown FeCl₃.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Water treatment, etching' },
  { id:'fe3o4', reactants:['Fe','O2'], eq:'Fe + O₂ → Fe₃O₄', balanced:'3Fe + 2O₂ → Fe₃O₄', products:['Fe3O4'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,15%)', enthalpy:-1118.4, desc:'Iron oxidizes to form black magnetite at specific conditions.', temp:'>300°C', realUse:'Magnetic materials, metallurgy' },
  { id:'fe-hcl', reactants:['Fe','HCl'], eq:'Fe + HCl → FeCl₂ + H₂', balanced:'Fe + 2HCl → FeCl₂ + H₂↑', products:['FeCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(15,70%,45%)', enthalpy:-87.9, desc:'Iron dissolves in acid producing hydrogen.', temp:'Room temp', realUse:'Hydrogen generation, iron chloride production' },
  { id:'fe-oh-h2so4', reactants:['Fe(OH)3','H2SO4'], eq:'Fe(OH)₃ + H₂SO₄ → Fe₂(SO₄)₃ + 6H₂O', balanced:'2Fe(OH)₃ + 3H₂SO₄ → Fe₂(SO₄)₃ + 6H₂O', products:['Fe2(SO4)3','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(15,70%,50%)', enthalpy:-120.0, desc:'Iron hydroxide dissolves in acid.', temp:'Room temp', realUse:'Iron sulfate production, water treatment' },

  // COPPER REACTIONS
  { id:'cuo', reactants:['Cu','O2'], eq:'Cu + O₂ → CuO', balanced:'2Cu + O₂ → 2CuO', products:['CuO'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,10%)', enthalpy:-157.3, desc:'Copper turns from reddish-brown to black when heated in air.', temp:'~300°C', realUse:'Catalysts, pigments, ceramics' },
  { id:'cus', reactants:['Cu','S'], eq:'Cu + S → CuS', balanced:'Cu + S → CuS', products:['CuS'], type:'synthesis', visual:'color-change', color:'hsl(220,20%,15%)', enthalpy:-53.1, desc:'Copper and sulfur form black copper sulfide when heated.', temp:'~400°C', realUse:'Semiconductor manufacturing, tests' },
  { id:'cucl2', reactants:['Cu','Cl2'], eq:'Cu + Cl₂ → CuCl₂', balanced:'Cu + Cl₂ → CuCl₂', products:['CuCl2'], type:'synthesis', visual:'color-change', color:'hsl(170,60%,40%)', enthalpy:-220.1, desc:'Copper reacts with chlorine forming green CuCl₂ solution.', temp:'~300°C', realUse:'Etching, catalysis, pigments' },
  { id:'cu-hno3', reactants:['Cu','HNO3'], eq:'Cu + HNO₃ → Cu(NO₃)₂ + NO₂ + H₂O', balanced:'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O', products:['Cu(NO3)2','NO2','H2O'], type:'redox', visual:'color-change', color:'hsl(170,60%,40%)', enthalpy:-180.0, desc:'Copper dissolves in nitric acid with brown NO₂ gas.', safety:'⚠️ NO₂ is toxic!', temp:'Room temp', realUse:'Copper nitrate production, etching' },
  { id:'cu-oh-h2so4', reactants:['Cu(OH)2','H2SO4'], eq:'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O', balanced:'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O', products:['CuSO4','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(170,60%,50%)', enthalpy:-85.0, desc:'Copper hydroxide dissolves in acid.', temp:'Room temp', realUse:'Copper sulfate production' },

  // ZINC REACTIONS
  { id:'zno', reactants:['Zn','O2'], eq:'Zn + O₂ → ZnO', balanced:'2Zn + O₂ → 2ZnO', products:['ZnO'], type:'oxidation', visual:'glow', color:'hsl(0,0%,95%)', enthalpy:-350.5, desc:'Zinc burns with blue-green flame forming white ZnO.', temp:'Ignition ~900°C', realUse:'Sunscreen, rubber, pigments' },
  { id:'zns', reactants:['Zn','S'], eq:'Zn + S → ZnS', balanced:'Zn + S → ZnS', products:['ZnS'], type:'synthesis', visual:'glow', color:'hsl(60,60%,60%)', enthalpy:-206.0, desc:'Zinc and sulfur form ZnS.', temp:'~800°C', realUse:'Phosphors, pigments' },
  { id:'zncl2', reactants:['Zn','Cl2'], eq:'Zn + Cl₂ → ZnCl₂', balanced:'Zn + Cl₂ → ZnCl₂', products:['ZnCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-415.1, desc:'Zinc reacts with chlorine gas.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Flux, batteries' },
  { id:'zn-hcl', reactants:['Zn','HCl'], eq:'Zn + HCl → ZnCl₂ + H₂', balanced:'Zn + 2HCl → ZnCl₂ + H₂↑', products:['ZnCl2','H2'], type:'single-replacement', visual:'bubbles', color:'hsl(180,20%,60%)', enthalpy:-153.9, desc:'Zinc dissolves in acid producing hydrogen bubbles.', temp:'Room temp', realUse:'Hydrogen generation, galvanizing' },
  { id:'zn-oh-h2so4', reactants:['Zn(OH)2','H2SO4'], eq:'Zn(OH)₂ + H₂SO₄ → ZnSO₄ + 2H₂O', balanced:'Zn(OH)₂ + H₂SO₄ → ZnSO₄ + 2H₂O', products:['ZnSO4','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(180,20%,65%)', enthalpy:-95.0, desc:'Zinc hydroxide dissolves in acid.', temp:'Room temp', realUse:'Zinc sulfate production' },

  // ACID-BASE REACTIONS
  { id:'hcl-naoh', reactants:['HCl','NaOH'], eq:'HCl + NaOH → NaCl + H₂O', balanced:'HCl + NaOH → NaCl + H₂O', products:['NaCl','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-55.8, desc:'Neutralization: acid + base → salt + water.', temp:'Room temp', realUse:'pH control, salt production' },
  { id:'h2so4-caoh2', reactants:['H2SO4','Ca(OH)2'], eq:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', balanced:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', products:['CaSO4','H2O'], type:'acid-base', visual:'precipitate', color:'hsl(0,0%,90%)', enthalpy:-106.7, desc:'Sulfuric acid neutralizes calcium hydroxide.', temp:'Room temp', realUse:'Gypsum production, water treatment' },
  { id:'hno3-koh', reactants:['HNO3','KOH'], eq:'HNO₃ + KOH → KNO₃ + H₂O', balanced:'HNO₃ + KOH → KNO₃ + H₂O', products:['KNO3','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(45,60%,70%)', enthalpy:-57.3, desc:'Nitric acid neutralizes potassium hydroxide.', temp:'Room temp', realUse:'Fertilizer, saltpeter production' },
  { id:'hcl-mgoh2', reactants:['HCl','Mg(OH)2'], eq:'HCl + Mg(OH)₂ → MgCl₂ + 2H₂O', balanced:'2HCl + Mg(OH)₂ → MgCl₂ + 2H₂O', products:['MgCl2','H2O'], type:'acid-base', visual:'dissolve', color:'hsl(120,50%,60%)', enthalpy:-111.0, desc:'Hydrochloric acid neutralizes magnesium hydroxide.', temp:'Room temp', realUse:'Magnesium chloride production, antacid' },

  // PRECIPITATION REACTIONS
  { id:'agno3-nacl', reactants:['AgNO3','NaCl'], eq:'AgNO₃ + NaCl → AgCl + NaNO₃', balanced:'AgNO₃ + NaCl → AgCl↓ + NaNO₃', products:['AgCl','NaNO3'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-33.4, desc:'Double replacement forms insoluble AgCl.', temp:'Room temp', realUse:'Qualitative analysis, photography' },
  { id:'pbno32-nacl', reactants:['Pb(NO3)2','NaCl'], eq:'Pb(NO₃)₂ + 2NaCl → PbCl₂ + 2NaNO₃', balanced:'Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃', products:['PbCl2','NaNO3'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,80%)', enthalpy:-26.8, desc:'Lead chloride precipitates from solution.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Research, pigments' },
  { id:'bacl2-na2so4', reactants:['BaCl2','Na2SO4'], eq:'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl', balanced:'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', products:['BaSO4','NaCl'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,95%)', enthalpy:-35.7, desc:'Barium sulfate forms white precipitate.', temp:'Room temp', realUse:'X-ray contrast, paints' },
  { id:'cacl2-na2co3', reactants:['CaCl2','Na2CO3'], eq:'CaCl₂ + Na₂CO₃ → CaCO₃ + 2NaCl', balanced:'CaCl₂ + Na₂CO₃ → CaCO₃↓ + 2NaCl', products:['CaCO3','NaCl'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,90%)', enthalpy:-12.6, desc:'Calcium carbonate precipitates from solution.', temp:'Room temp', realUse:'Limestone formation, water softening' },
  { id:'fes-cuso4', reactants:['FeS','CuSO4'], eq:'FeS + CuSO₄ → CuS + FeSO₄', balanced:'FeS + CuSO₄ → CuS↓ + FeSO₄', products:['CuS','FeSO4'], type:'precipitation', visual:'precipitate', color:'hsl(220,20%,15%)', enthalpy:-50.0, desc:'Copper sulfide precipitates, displacing iron.', temp:'Room temp', realUse:'Qualitative analysis, copper extraction' },

  // REDOX REACTIONS
  { id:'kmno4-feso4', reactants:['KMnO4','FeSO4'], eq:'KMnO₄ + FeSO₄ → MnO₂ + Fe₂(SO₄)₃ + K₂SO₄', balanced:'2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 2MnSO₄ + 5Fe₂(SO₄)₃ + K₂SO₄ + 8H₂O', products:['MnSO4','Fe2(SO4)3','K2SO4','H2O'], type:'redox', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-165.0, desc:'Potassium permanganate oxidizes iron(II).', temp:'Room temp', realUse:'Analytical chemistry, water treatment' },
  { id:'h2o2-mno2', reactants:['H2O2','MnO2'], eq:'H₂O₂ + MnO₂ → MnO₄⁻ + H₂O', balanced:'3H₂O₂ + 2MnO₂ → 2MnO₄⁻ + 2H₂O + 2H⁺', products:['MnO4-','H2O'], type:'redox', visual:'color-change', color:'hsl(300,60%,50%)', enthalpy:-76.0, desc:'Hydrogen peroxide oxidizes manganese dioxide.', temp:'Room temp', realUse:'Rocket fuel, bleaching' },
  { id:'cu-agno3', reactants:['Cu','AgNO3'], eq:'Cu + Ag⁺ → Cu²⁺ + Ag', balanced:'Cu + 2Ag⁺ → Cu²⁺ + 2Ag', products:['Cu2+','Ag'], type:'redox', visual:'precipitate', color:'hsl(45,80%,60%)', enthalpy:-146.0, desc:'Copper displaces silver from solution.', temp:'Room temp', realUse:'Silver recovery, electroplating' },
  { id:'zn-cuso4', reactants:['Zn','CuSO4'], eq:'Zn + CuSO₄ → ZnSO₄ + Cu', balanced:'Zn + CuSO₄ → ZnSO₄ + Cu', products:['ZnSO4','Cu'], type:'redox', visual:'color-change', color:'hsl(45,80%,60%)', enthalpy:-212.0, desc:'Zinc displaces copper from solution.', temp:'Room temp', realUse:'Copper purification, Daniell cell' },
  { id:'fe-cuso4', reactants:['Fe','CuSO4'], eq:'Fe + CuSO₄ → FeSO₄ + Cu', balanced:'Fe + CuSO₄ → FeSO₄ + Cu', products:['FeSO4','Cu'], type:'redox', visual:'color-change', color:'hsl(15,70%,45%)', enthalpy:-135.0, desc:'Iron displaces copper from solution.', temp:'Room temp', realUse:'Copper extraction, reactivity series' },

  // COMBUSTION REACTIONS
  { id:'ch4-o2', reactants:['CH4','O2'], eq:'CH₄ + 2O₂ → CO₂ + 2H₂O', balanced:'CH₄ + 2O₂ → CO₂ + 2H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-890.4, desc:'Methane combustion — natural gas burning.', temp:'Ignition ~595°C', realUse:'Heating, cooking, energy' },
  { id:'c2h5oh-o2', reactants:['C2H5OH','O2'], eq:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', balanced:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(30,60%,70%)', enthalpy:-1366.8, desc:'Ethanol combustion — alcohol burning.', temp:'Ignition ~365°C', realUse:'Fuel, spirits' },
  { id:'c6h12o6-o2', reactants:['C6H12O6','O2'], eq:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-2808.0, desc:'Glucose combustion — cellular respiration.', temp:'Room temp (enzymatic)', realUse:'Metabolism, baking' },
  { id:'c3h8-o2', reactants:['C3H8','O2'], eq:'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', balanced:'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,90%)', enthalpy:-2219.0, desc:'Propane combustion — BBQ gas burning.', temp:'Ignition ~470°C', realUse:'Heating, cooking, camping' },
  { id:'c8h18-o2', reactants:['C8H18','O2'], eq:'C₈H₁₈ + 12½O₂ → 8CO₂ + 9H₂O', balanced:'2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O', products:['CO2','H2O'], type:'combustion', visual:'fire', color:'hsl(0,0%,85%)', enthalpy:-5074.0, desc:'Octane combustion — gasoline burning.', temp:'Ignition ~220°C', realUse:'Automobiles, engines' },

  // INDUSTRIAL REACTIONS
  { id:'haber-bosch', reactants:['N2','H2'], eq:'N₂ + 3H₂ → 2NH₃', balanced:'N₂ + 3H₂ ⇌ 2NH₃', products:['NH3'], type:'synthesis', visual:'gas-release', color:'hsl(200,40%,60%)', enthalpy:-92.4, desc:'Haber-Bosch process for ammonia synthesis.', temp:'400-500°C, 200 atm', catalyst:'Fe', realUse:'Fertilizers, explosives' },
  { id:'contact-process', reactants:['SO2','O2'], eq:'2SO₂ + O₂ → 2SO₃', balanced:'2SO₂ + O₂ ⇌ 2SO₃', products:['SO3'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,90%)', enthalpy:-198.2, desc:'Contact process for sulfuric acid production.', temp:'400-600°C', catalyst:'V₂O₅', realUse:'Sulfuric acid, detergents' },
  { id:'ostwald', reactants:['NH3','O2'], eq:'4NH₃ + 5O₂ → 4NO + 6H₂O', balanced:'4NH₃ + 5O₂ → 4NO + 6H₂O', products:['NO','H2O'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-905.6, desc:'Ostwald process first step for nitric acid.', temp:'800-900°C', catalyst:'Pt-Rh', realUse:'Nitric acid, fertilizers' },
  { id:'lime-kiln', reactants:['CaCO3'], eq:'CaCO₃ → CaO + CO₂', balanced:'CaCO₃ → CaO + CO₂↑', products:['CaO','CO2'], type:'decomposition', visual:'gas-release', color:'hsl(0,0%,90%)', enthalpy:178.0, desc:'Limestone decomposition in lime kilns.', temp:'900°C', realUse:'Cement, steelmaking' },
  { id:'blast-furnace', reactants:['Fe2O3','CO'], eq:'Fe₂O₃ + 3CO → 2Fe + 3CO₂', balanced:'Fe₂O₃ + 3CO → 2Fe + 3CO₂', products:['Fe','CO2'], type:'redox', visual:'glow', color:'hsl(15,70%,45%)', enthalpy:-26.8, desc:'Iron reduction in blast furnace.', temp:'1500°C', realUse:'Steel production' },

  // BIOCHEMICAL REACTIONS
  { id:'fermentation', reactants:['C6H12O6'], eq:'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', balanced:'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', products:['C2H5OH','CO2'], type:'fermentation', visual:'bubbles', color:'hsl(45,60%,70%)', enthalpy:-67.0, desc:'Yeast fermentation of glucose to ethanol.', temp:'30-37°C', realUse:'Beer, wine, bread' },
  { id:'respiration', reactants:['C6H12O6','O2'], eq:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products:['CO2','H2O'], type:'combustion', visual:'gas-release', color:'hsl(0,0%,95%)', enthalpy:-2808.0, desc:'Aerobic respiration in cells.', temp:'37°C', realUse:'Energy production in organisms' },
  { id:'photosynthesis', reactants:['CO2','H2O'], eq:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', balanced:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', products:['C6H12O6','O2'], type:'photosynthesis', visual:'glow', color:'hsl(120,60%,50%)', enthalpy:2808.0, desc:'Plants convert CO₂ and water to glucose using sunlight.', temp:'Room temp (with chlorophyll)', realUse:'Food production, oxygen generation' },

  // ELECTROCHEMICAL REACTIONS
  { id:'electrolysis-h2o', reactants:['H2O'], eq:'2H₂O → 2H₂ + O₂', balanced:'2H₂O → 2H₂↑ + O₂↑', products:['H2','O2'], type:'electrolysis', visual:'bubbles', color:'hsl(200,60%,70%)', enthalpy:285.8, desc:'Water electrolysis produces hydrogen and oxygen.', temp:'Room temp', realUse:'Hydrogen fuel, oxygen production' },
  { id:'daniel-cell', reactants:['Zn','CuSO4'], eq:'Zn + CuSO₄ → ZnSO₄ + Cu', balanced:'Zn + CuSO₄ → ZnSO₄ + Cu', products:['ZnSO4','Cu'], type:'redox', visual:'color-change', color:'hsl(45,80%,60%)', enthalpy:-212.0, desc:'Daniel cell: zinc anode, copper cathode.', temp:'Room temp', realUse:'Batteries, electrochemistry teaching' },

  // DECOMPOSITION REACTIONS
  { id:'h2o2-decomp', reactants:['H2O2'], eq:'2H₂O₂ → 2H₂O + O₂', balanced:'2H₂O₂ → 2H₂O + O₂↑', products:['H2O','O2'], type:'decomposition', visual:'bubbles', color:'hsl(200,60%,70%)', enthalpy:-196.0, desc:'Hydrogen peroxide decomposes to water and oxygen.', temp:'Room temp', catalyst:'MnO₂', realUse:'Rocket fuel, bleaching, disinfection' },
  { id:'caco3-heat', reactants:['CaCO3'], eq:'CaCO₃ → CaO + CO₂', balanced:'CaCO₃ → CaO + CO₂↑', products:['CaO','CO2'], type:'decomposition', visual:'gas-release', color:'hsl(0,0%,90%)', enthalpy:178.0, desc:'Calcium carbonate decomposes when heated.', temp:'825°C', realUse:'Limestone processing, cement' },
  { id:'nacl-electrolysis', reactants:['NaCl'], eq:'2NaCl → 2Na + Cl₂', balanced:'2NaCl → 2Na + Cl₂↑', products:['Na','Cl2'], type:'electrolysis', visual:'spark', color:'hsl(45,90%,70%)', enthalpy:411.0, desc:'Sodium chloride electrolysis produces sodium and chlorine.', temp:'800°C', realUse:'Sodium metal, chlorine gas production' },

  // ATMOSPHERIC REACTIONS
  { id:'ozone-formation', reactants:['O2'], eq:'3O₂ → 2O₃', balanced:'3O₂ → 2O₃', products:['O3'], type:'synthesis', visual:'glow', color:'hsl(200,60%,60%)', enthalpy:142.0, desc:'Ozone formation from oxygen in atmosphere.', temp:'High energy (UV)', realUse:'Ozone layer, air purification' },
  { id:'acid-rain', reactants:['SO2','H2O'], eq:'SO₂ + H₂O → H₂SO₃', balanced:'SO₂ + H₂O → H₂SO₃', products:['H2SO3'], type:'acid-base', visual:'dissolve', color:'hsl(0,0%,85%)', enthalpy:-52.0, desc:'Sulfur dioxide forms acid in water vapor.', temp:'Room temp', realUse:'Acid rain formation' },

  // EXPLOSIVE REACTIONS
  { id:'black-powder', reactants:['KNO3','C','S'], eq:'2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', balanced:'2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', products:['K2S','N2','CO2'], type:'redox', visual:'explosion', color:'hsl(0,0%,20%)', enthalpy:-600.0, desc:'Black powder explosion reaction.', safety:'⚠️ EXPLOSIVE!', temp:'Ignition ~300°C', realUse:'Fireworks, mining' },
  { id:'tnt', reactants:['C7H5N3O6'], eq:'2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', balanced:'2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', products:['N2','H2O','CO','C'], type:'decomposition', visual:'explosion', color:'hsl(45,60%,50%)', enthalpy:-2800.0, desc:'TNT detonation reaction.', safety:'⚠️ HIGH EXPLOSIVE!', temp:'Detonation', realUse:'Explosives, demolition' },

  // NOBLE GAS REACTIONS
  { id:'xef2', reactants:['Xe','F2'], eq:'Xe + F₂ → XeF₂', balanced:'Xe + F₂ → XeF₂', products:['XeF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-108.0, desc:'Xenon reacts with fluorine — noble gas compound!', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, oxidizers' },
  { id:'xef4', reactants:['Xe','F2'], eq:'Xe + 2F₂ → XeF₄', balanced:'Xe + 2F₂ → XeF₄', products:['XeF4'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-251.0, desc:'Xenon forms XeF₄ with excess fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, fluorinating agent' },
  { id:'xef6', reactants:['Xe','F2'], eq:'Xe + 3F₂ → XeF₆', balanced:'Xe + 3F₂ → XeF₆', products:['XeF6'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-294.0, desc:'Xenon forms XeF₆ — highest oxidation state noble gas compound.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, superconductors' },

  // RARE EARTH REACTIONS
  { id:'la2o3', reactants:['La','O2'], eq:'La + O₂ → La₂O₃', balanced:'4La + 3O₂ → 2La₂O₃', products:['La2O3'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,85%)', enthalpy:-1794.0, desc:'Lanthanum oxidizes to La₂O₃.', temp:'>400°C', realUse:'Catalysts, optics' },
  { id:'ce2o3', reactants:['Ce','O2'], eq:'Ce + O₂ → Ce₂O₃', balanced:'4Ce + 3O₂ → 2Ce₂O₃', products:['Ce2O3'], type:'oxidation', visual:'color-change', color:'hsl(50,40%,60%)', enthalpy:-1778.0, desc:'Cerium oxidizes to Ce₂O₃.', temp:'>300°C', realUse:'Catalysts, glass polishing' },
  { id:'nd2o3', reactants:['Nd','O2'], eq:'Nd + O₂ → Nd₂O₃', balanced:'4Nd + 3O₂ → 2Nd₂O₃', products:['Nd2O3'], type:'oxidation', visual:'color-change', color:'hsl(280,40%,50%)', enthalpy:-1808.0, desc:'Neodymium oxidizes to Nd₂O₃.', temp:'>300°C', realUse:'Magnets, lasers' },

  // MERCURY REACTIONS
  { id:'hgo', reactants:['Hg','O2'], eq:'Hg + O₂ → HgO', balanced:'2Hg + O₂ → 2HgO', products:['HgO'], type:'oxidation', visual:'color-change', color:'hsl(15,60%,40%)', enthalpy:-90.8, desc:'Mercury oxidizes to red HgO.', safety:'⚠️ Hg is toxic!', temp:'>300°C', realUse:'Batteries, pigments' },
  { id:'hgcl2', reactants:['Hg','Cl2'], eq:'Hg + Cl₂ → HgCl₂', balanced:'Hg + Cl₂ → HgCl₂', products:['HgCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-230.1, desc:'Mercury reacts with chlorine.', safety:'⚠️ Cl₂ and Hg are toxic!', temp:'Room temp', realUse:'Catalysis, medicine' },
  { id:'hgs', reactants:['Hg','S'], eq:'Hg + S → HgS', balanced:'Hg + S → HgS', products:['HgS'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-58.2, desc:'Mercury and sulfur form black HgS.', safety:'⚠️ Hg is toxic!', temp:'Room temp', realUse:'Pigments, detectors' },

  // LEAD REACTIONS
  { id:'pbo', reactants:['Pb','O2'], eq:'Pb + O₂ → PbO', balanced:'2Pb + O₂ → 2PbO', products:['PbO'], type:'oxidation', visual:'color-change', color:'hsl(30,40%,50%)', enthalpy:-219.0, desc:'Lead oxidizes to PbO.', safety:'⚠️ Pb is toxic!', temp:'>300°C', realUse:'Glass, batteries' },
  { id:'pbcl2', reactants:['Pb','Cl2'], eq:'Pb + Cl₂ → PbCl₂', balanced:'Pb + Cl₂ → PbCl₂', products:['PbCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-359.4, desc:'Lead reacts with chlorine.', safety:'⚠️ Cl₂ and Pb are toxic!', temp:'Room temp', realUse:'Research, pigments' },
  { id:'pbs', reactants:['Pb','S'], eq:'Pb + S → PbS', balanced:'Pb + S → PbS', products:['PbS'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,15%)', enthalpy:-94.3, desc:'Lead and sulfur form PbS.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Detectors, pigments' },

  // SILVER REACTIONS
  { id:'agcl', reactants:['Ag','Cl2'], eq:'Ag + Cl₂ → AgCl', balanced:'2Ag + Cl₂ → 2AgCl', products:['AgCl'], type:'synthesis', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-127.0, desc:'Silver reacts with chlorine forming white precipitate.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Photography, mirrors' },
  { id:'ags', reactants:['Ag','S'], eq:'Ag + S → Ag₂S', balanced:'2Ag + S → Ag₂S', products:['Ag2S'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-32.6, desc:'Silver and sulfur form Ag₂S.', temp:'Room temp', realUse:'Jewelry, detectors' },

  // CADMIUM REACTIONS
  { id:'cdo', reactants:['Cd','O2'], eq:'Cd + O₂ → CdO', balanced:'2Cd + O₂ → 2CdO', products:['CdO'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,25%)', enthalpy:-258.4, desc:'Cadmium oxidizes to CdO.', safety:'⚠️ Cd is toxic!', temp:'>300°C', realUse:'Batteries, pigments' },
  { id:'cdcl2', reactants:['Cd','Cl2'], eq:'Cd + Cl₂ → CdCl₂', balanced:'Cd + Cl₂ → CdCl₂', products:['CdCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-391.5, desc:'Cadmium reacts with chlorine.', safety:'⚠️ Cl₂ and Cd are toxic!', temp:'Room temp', realUse:'Electroplating, research' },

  // TIN REACTIONS
  { id:'sno2', reactants:['Sn','O2'], eq:'Sn + O₂ → SnO₂', balanced:'Sn + O₂ → SnO₂', products:['SnO2'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,90%)', enthalpy:-580.7, desc:'Tin oxidizes to SnO₂.', temp:'>1000°C', realUse:'Glass, ceramics' },
  { id:'sncl2', reactants:['Sn','Cl2'], eq:'Sn + Cl₂ → SnCl₂', balanced:'Sn + Cl₂ → SnCl₂', products:['SnCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,70%)', enthalpy:-325.1, desc:'Tin reacts with chlorine forming stannous chloride.', temp:'Room temp', realUse:'Reducing agent, tin plating' },

  // ANTIMONY REACTIONS
  { id:'sb2o3', reactants:['Sb','O2'], eq:'Sb + O₂ → Sb₂O₃', balanced:'4Sb + 3O₂ → 2Sb₂O₃', products:['Sb2O3'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,85%)', enthalpy:-699.6, desc:'Antimony oxidizes to Sb₂O₃.', temp:'>600°C', realUse:'Flame retardants, glass' },

  // BISMUTH REACTIONS
  { id:'bicl3', reactants:['Bi','Cl2'], eq:'Bi + Cl₂ → BiCl₃', balanced:'2Bi + 3Cl₂ → 2BiCl₃', products:['BiCl3'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-379.1, desc:'Bismuth reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },

  // PHOSPHORUS REACTIONS
  { id:'p4o10', reactants:['P4','O2'], eq:'P₄ + 5O₂ → P₄O₁₀', balanced:'P₄ + 5O₂ → P₄O₁₀', products:['P4O10'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-2984.0, desc:'Phosphorus burns to P₄O₁₀.', safety:'⚠️ Toxic!', temp:'Ignition ~34°C', realUse:'Phosphoric acid' },
  { id:'pcl3', reactants:['P4','Cl2'], eq:'P₄ + 6Cl₂ → 4PCl₃', balanced:'P₄ + 6Cl₂ → 4PCl₃', products:['PCl3'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-319.0, desc:'Phosphorus reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Organic synthesis' },

  // ARSENIC REACTIONS
  { id:'as2o3', reactants:['As','O2'], eq:'As + O₂ → As₂O₃', balanced:'4As + 3O₂ → 2As₂O₃', products:['As2O3'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-657.0, desc:'Arsenic oxidizes to As₂O₃.', safety:'⚠️ As is toxic!', temp:'>200°C', realUse:'Glass, pesticides' },
  { id:'ascl3', reactants:['As','Cl2'], eq:'As + Cl₂ → AsCl₃', balanced:'2As + 3Cl₂ → 2AsCl₃', products:['AsCl3'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-305.0, desc:'Arsenic reacts with chlorine.', safety:'⚠️ Cl₂ and As are toxic!', temp:'Room temp', realUse:'Semiconductors' },

  // SELENIUM REACTIONS
  { id:'se2o3', reactants:['Se','O2'], eq:'Se + O₂ → SeO₂', balanced:'Se + O₂ → SeO₂', products:['SeO2'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,80%)', enthalpy:-230.0, desc:'Selenium oxidizes to SeO₂.', temp:'>200°C', realUse:'Catalysis, glass' },
  { id:'sef4', reactants:['Se','F2'], eq:'Se + F₂ → SeF₄', balanced:'Se + 2F₂ → SeF₄', products:['SeF4'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-850.0, desc:'Selenium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research' },

  // BERYLLIUM REACTIONS
  { id:'beo', reactants:['Be','O2'], eq:'Be + O₂ → BeO', balanced:'2Be + O₂ → 2BeO', products:['BeO'], type:'oxidation', visual:'glow', color:'hsl(0,0%,90%)', enthalpy:-609.4, desc:'Beryllium oxidizes to form BeO.', temp:'>800°C', realUse:'Ceramics, nuclear applications' },
  { id:'bef2', reactants:['Be','F2'], eq:'Be + F₂ → BeF₂', balanced:'Be + F₂ → BeF₂', products:['BeF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1022.0, desc:'Beryllium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Be is toxic!', temp:'Room temp', realUse:'Nuclear reactors, research' },
  { id:'becl2', reactants:['Be','Cl2'], eq:'Be + Cl₂ → BeCl₂', balanced:'Be + Cl₂ → BeCl₂', products:['BeCl2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-495.8, desc:'Beryllium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Be is toxic!', temp:'Room temp', realUse:'Catalysis, research' },

  // STRONTIUM REACTIONS
  { id:'sro', reactants:['Sr','O2'], eq:'Sr + O₂ → SrO', balanced:'2Sr + O₂ → 2SrO', products:['SrO'], type:'oxidation', visual:'glow', color:'hsl(0,0%,85%)', enthalpy:-592.0, desc:'Strontium burns forming SrO.', temp:'>300°C', realUse:'Fireworks, ceramics' },
  { id:'srcl2', reactants:['Sr','Cl2'], eq:'Sr + Cl₂ → SrCl₂', balanced:'Sr + Cl₂ → SrCl₂', products:['SrCl2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-828.4, desc:'Strontium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Fireworks, medicine' },

  // BARIUM REACTIONS
  { id:'bao', reactants:['Ba','O2'], eq:'Ba + O₂ → BaO', balanced:'2Ba + O₂ → 2BaO', products:['BaO'], type:'synthesis', visual:'glow', color:'hsl(120,60%,50%)', enthalpy:-553.5, desc:'Barium burns with characteristic green flame.', safety:'⚠️ All barium compounds are toxic!', temp:'>550°C', realUse:'Fireworks (green), glass, ceramics' },
  { id:'bacl2', reactants:['Ba','Cl2'], eq:'Ba + Cl₂ → BaCl₂', balanced:'Ba + Cl₂ → BaCl₂', products:['BaCl2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-858.6, desc:'Barium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Fireworks, water softening' },

  // CESIUM REACTIONS
  { id:'csh2o', reactants:['Cs','H2O'], eq:'Cs + H₂O → CsOH + H₂', balanced:'2Cs + 2H₂O → 2CsOH + H₂↑', products:['CsOH','H2'], type:'single-replacement', visual:'explosion', color:'hsl(200,70%,55%)', enthalpy:-256.0, desc:'Most violent alkali-water reaction! Massive explosion!', safety:'⚠️ CATASTROPHIC!', temp:'Spontaneous', realUse:'Alkali metal reactivity studies' },
  { id:'cscl', reactants:['Cs','Cl2'], eq:'Cs + Cl₂ → CsCl', balanced:'2Cs + Cl₂ → 2CsCl', products:['CsCl'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-433.0, desc:'Cesium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Crystallography, medicine' },

  // RUBIDIUM REACTIONS
  { id:'rbh2o', reactants:['Rb','H2O'], eq:'Rb + H₂O → RbOH + H₂', balanced:'2Rb + 2H₂O → 2RbOH + H₂↑', products:['RbOH','H2'], type:'single-replacement', visual:'explosion', color:'hsl(340,60%,55%)', enthalpy:-236.0, desc:'Rubidium reacts explosively with water!', safety:'⚠️ EXPLOSIVE!', temp:'Spontaneous', realUse:'Alkali reactivity series demonstration' },
  { id:'rbcl', reactants:['Rb','Cl2'], eq:'Rb + Cl₂ → RbCl', balanced:'2Rb + Cl₂ → 2RbCl', products:['RbCl'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-435.0, desc:'Rubidium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },

  // LITHIUM REACTIONS
  { id:'lif', reactants:['Li','F2'], eq:'Li + F₂ → LiF', balanced:'2Li + F₂ → 2LiF', products:['LiF'], type:'synthesis', visual:'spark', color:'hsl(180,70%,60%)', enthalpy:-616.0, desc:'Lithium reacts vigorously with fluorine gas forming LiF.', safety:'⚠️ Violent! F₂ is extremely toxic.', temp:'Room temp', realUse:'Nuclear reactors, ceramics' },
  { id:'licl', reactants:['Li','Cl2'], eq:'Li + Cl₂ → LiCl', balanced:'2Li + Cl₂ → 2LiCl', products:['LiCl'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-408.6, desc:'Lithium burns in chlorine gas.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Batteries, air conditioning' },
  { id:'libr', reactants:['Li','Br2'], eq:'Li + Br₂ → LiBr', balanced:'2Li + Br₂ → 2LiBr', products:['LiBr'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-351.2, desc:'Lithium reacts with bromine producing heat and smoke.', safety:'⚠️ Br₂ is corrosive!', temp:'Room temp', realUse:'Medicine, photography' },
  { id:'lii', reactants:['Li','I2'], eq:'Li + I₂ → LiI', balanced:'2Li + I₂ → 2LiI', products:['LiI'], type:'synthesis', visual:'color-change', color:'hsl(45,60%,70%)', enthalpy:-270.4, desc:'Lithium and iodine form LiI.', temp:'Room temp', realUse:'Organic synthesis, electrolytes' },

  // MAGNESIUM HALIDES
  { id:'mgf2', reactants:['Mg','F2'], eq:'Mg + F₂ → MgF₂', balanced:'Mg + F₂ → MgF₂', products:['MgF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1124.0, desc:'Magnesium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Optics, ceramics' },
  { id:'mgbr2', reactants:['Mg','Br2'], eq:'Mg + Br₂ → MgBr₂', balanced:'Mg + Br₂ → MgBr₂', products:['MgBr2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-524.3, desc:'Magnesium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Medicine, synthesis' },
  { id:'mgi2', reactants:['Mg','I2'], eq:'Mg + I₂ → MgI₂', balanced:'Mg + I₂ → MgI₂', products:['MgI2'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-364.0, desc:'Magnesium and iodine form MgI₂.', temp:'Room temp', realUse:'Organic synthesis, batteries' },

  // CALCIUM HALIDES
  { id:'caf2', reactants:['Ca','F2'], eq:'Ca + F₂ → CaF₂', balanced:'Ca + F₂ → CaF₂', products:['CaF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1219.6, desc:'Calcium reacts with fluorine forming fluorite.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Optics, metallurgy' },
  { id:'cabr2', reactants:['Ca','Br2'], eq:'Ca + Br₂ → CaBr₂', balanced:'Ca + Br₂ → CaBr₂', products:['CaBr2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-675.3, desc:'Calcium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Oil drilling, medicine' },
  { id:'cai2', reactants:['Ca','I2'], eq:'Ca + I₂ → CaI₂', balanced:'Ca + I₂ → CaI₂', products:['CaI2'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,75%)', enthalpy:-533.5, desc:'Calcium and iodine form CaI₂.', temp:'Room temp', realUse:'Photography, medicine' },

  // STRONTIUM HALIDES
  { id:'srf2', reactants:['Sr','F2'], eq:'Sr + F₂ → SrF₂', balanced:'Sr + F₂ → SrF₂', products:['SrF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-1217.0, desc:'Strontium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'srbr2', reactants:['Sr','Br2'], eq:'Sr + Br₂ → SrBr₂', balanced:'Sr + Br₂ → SrBr₂', products:['SrBr2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-709.6, desc:'Strontium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'sri2', reactants:['Sr','I2'], eq:'Sr + I₂ → SrI₂', balanced:'Sr + I₂ → SrI₂', products:['SrI2'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-566.9, desc:'Strontium and iodine form SrI₂.', temp:'Room temp', realUse:'Research, optics' },

  // BARIUM HALIDES
  { id:'baf2', reactants:['Ba','F2'], eq:'Ba + F₂ → BaF₂', balanced:'Ba + F₂ → BaF₂', products:['BaF2'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-1203.0, desc:'Barium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Optics, scintillation' },
  { id:'babr2', reactants:['Ba','Br2'], eq:'Ba + Br₂ → BaBr₂', balanced:'Ba + Br₂ → BaBr₂', products:['BaBr2'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-743.5, desc:'Barium reacts with bromine.', safety:'⚠️ Br₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'bai2', reactants:['Ba','I2'], eq:'Ba + I₂ → BaI₂', balanced:'Ba + I₂ → BaI₂', products:['BaI2'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-602.1, desc:'Barium and iodine form BaI₂.', safety:'⚠️ Ba is toxic!', temp:'Room temp', realUse:'Research, medicine' },

  // SODIUM HALIDES
  { id:'naf', reactants:['Na','F2'], eq:'Na + F₂ → NaF', balanced:'2Na + F₂ → 2NaF', products:['NaF'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-575.3, desc:'Sodium reacts with fluorine forming NaF.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Toothpaste, water fluoridation' },
  { id:'nabr', reactants:['Na','Br2'], eq:'Na + Br₂ → NaBr', balanced:'2Na + Br₂ → 2NaBr', products:['NaBr'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-361.0, desc:'Sodium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Medicine, photography' },

  // POTASSIUM HALIDES
  { id:'kf', reactants:['K','F2'], eq:'K + F₂ → KF', balanced:'2K + F₂ → 2KF', products:['KF'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-567.0, desc:'Potassium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'kbr', reactants:['K','Br2'], eq:'K + Br₂ → KBr', balanced:'2K + Br₂ → 2KBr', products:['KBr'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-392.0, desc:'Potassium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Medicine, photography' },
  { id:'ki', reactants:['K','I2'], eq:'K + I₂ → KI', balanced:'2K + I₂ → 2KI', products:['KI'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-328.0, desc:'Potassium and iodine form KI.', temp:'Room temp', realUse:'Iodine supplement, photography' },

  // CESIUM HALIDES
  { id:'csf', reactants:['Cs','F2'], eq:'Cs + F₂ → CsF', balanced:'2Cs + F₂ → 2CsF', products:['CsF'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-530.9, desc:'Cesium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'csbr', reactants:['Cs','Br2'], eq:'Cs + Br₂ → CsBr', balanced:'2Cs + Br₂ → 2CsBr', products:['CsBr'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-395.4, desc:'Cesium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'csi', reactants:['Cs','I2'], eq:'Cs + I₂ → CsI', balanced:'2Cs + I₂ → 2CsI', products:['CsI'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,65%)', enthalpy:-346.0, desc:'Cesium and iodine form CsI.', temp:'Room temp', realUse:'Scintillators, research' },

  // RUBIDIUM HALIDES
  { id:'rbf', reactants:['Rb','F2'], eq:'Rb + F₂ → RbF', balanced:'2Rb + F₂ → 2RbF', products:['RbF'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-549.0, desc:'Rubidium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research' },
  { id:'rbbr', reactants:['Rb','Br2'], eq:'Rb + Br₂ → RbBr', balanced:'2Rb + Br₂ → 2RbBr', products:['RbBr'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-389.1, desc:'Rubidium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'rbi', reactants:['Rb','I2'], eq:'Rb + I₂ → RbI', balanced:'2Rb + I₂ → 2RbI', products:['RbI'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-333.9, desc:'Rubidium and iodine form RbI.', temp:'Room temp', realUse:'Research, optics' },

  // MERCURY REACTIONS
  { id:'hgs', reactants:['Hg','S'], eq:'Hg + S → HgS', balanced:'Hg + S → HgS', products:['Cinnabar (HgS)'], type:'synthesis', visual:'color-change', color:'hsl(0,85%,45%)', enthalpy:-58.2, desc:'Mercury + sulfur = cinnabar. Vibrant red — used in alchemy!', safety:'⚠️ Mercury is toxic!', temp:'Room temp (grinding)', realUse:'Vermilion pigment, alchemy traditions' },

  // NITROGEN REACTIONS
  { id:'nh3', reactants:['N','H'], eq:'N₂ + H₂ → NH₃', balanced:'N₂ + 3H₂ ⇌ 2NH₃', products:['Ammonia (NH₃)'], type:'synthesis', visual:'smoke', color:'hsl(200,30%,70%)', enthalpy:-92.2, desc:'Haber process — feeds billions through fertilizers! Industrial scale.', catalyst:'Iron catalyst', temp:'400-500°C, 150-300 atm', realUse:'Fertilizers, explosives, coolant' },
  { id:'no', reactants:['N','O'], eq:'N₂ + O₂ → NO', balanced:'N₂ + O₂ → 2NO', products:['Nitric Oxide (NO)'], type:'synthesis', visual:'spark', color:'hsl(270,70%,60%)', enthalpy:90.3, desc:'Only at extreme temperatures like lightning bolts.', temp:'~3000°C (lightning)', realUse:'Atmospheric chemistry, pollution' },

  // CALCIUM REACTIONS
  { id:'cah2o', reactants:['Ca','H'], eq:'Ca + H₂O → Ca(OH)₂ + H₂', balanced:'Ca + 2H₂O → Ca(OH)₂ + H₂↑', products:['Ca(OH)₂','Hydrogen Gas'], type:'single-replacement', visual:'bubbles', color:'hsl(0,0%,85%)', enthalpy:-635.1, desc:'Calcium reacts steadily with water.', temp:'Room temp', realUse:'Cement, water treatment, liming' },
  { id:'cao', reactants:['Ca','O'], eq:'Ca + O₂ → CaO', balanced:'2Ca + O₂ → 2CaO', products:['Quicklime (CaO)'], type:'synthesis', visual:'glow', color:'hsl(0,0%,92%)', enthalpy:-635.1, desc:'Calcium burns brightly forming quicklime.', temp:'~842°C', realUse:'Cement production, steelmaking' },

  // LITHIUM REACTIONS
  { id:'lih2o', reactants:['Li','H'], eq:'Li + H₂O → LiOH + H₂', balanced:'2Li + 2H₂O → 2LiOH + H₂↑', products:['LiOH','Hydrogen Gas'], type:'single-replacement', visual:'bubbles', color:'hsl(0,70%,55%)', enthalpy:-222.8, desc:'Lithium gently fizzes in water with crimson flame.', temp:'Room temp', realUse:'Battery chemistry, lithium extraction' },

  // ZINC REACTIONS
  { id:'znhcl', reactants:['Zn','H'], eq:'Zn + HCl → ZnCl₂ + H₂', balanced:'Zn + 2HCl → ZnCl₂ + H₂↑', products:['ZnCl₂','Hydrogen Gas'], type:'single-replacement', visual:'bubbles', color:'hsl(180,20%,60%)', enthalpy:-153.9, desc:'Zinc dissolves in acid producing hydrogen bubbles.', temp:'Room temp', realUse:'Hydrogen generation, galvanizing' },
  { id:'zno', reactants:['Zn','O'], eq:'Zn + O₂ → ZnO', balanced:'2Zn + O₂ → 2ZnO', products:['Zinc Oxide (ZnO)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,95%)', enthalpy:-350.5, desc:'Zinc burns with blue-green flame forming white ZnO.', temp:'Ignition ~900°C', realUse:'Sunscreen, rubber, pigments' },

  // LEAD REACTIONS
  { id:'pbs', reactants:['Pb','S'], eq:'Pb + S → PbS', balanced:'Pb + S → PbS', products:['Galena (PbS)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,25%)', enthalpy:-100.4, desc:'Lead and sulfur form galena — main lead ore.', safety:'⚠️ Lead is toxic!', temp:'~300°C', realUse:'Lead smelting, mineral specimens' },
  { id:'pbi2', reactants:['Pb','I'], eq:'Pb²⁺ + I⁻ → PbI₂', balanced:'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃', products:['Golden Rain (PbI₂)'], type:'precipitation', visual:'precipitate', color:'hsl(50,90%,55%)', enthalpy:-175.5, desc:'Beautiful golden-yellow precipitate — "golden rain" demo!', safety:'⚠️ Lead is toxic!', temp:'Room temp', realUse:'Solar cells, qualitative analysis' },

  // SILVER REACTIONS
  { id:'ag2s', reactants:['Ag','S'], eq:'Ag + S → Ag₂S', balanced:'2Ag + S → Ag₂S', products:['Silver Tarnish (Ag₂S)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-32.6, desc:'Silver tarnishes forming black silver sulfide.', temp:'Room temp (slow)', realUse:'Photography, silver care, chemistry' },

  // PHOSPHORUS REACTIONS
  { id:'p2o5', reactants:['P','O'], eq:'P + O₂ → P₂O₅', balanced:'4P + 5O₂ → 2P₂O₅', products:['Phosphorus Pentoxide'], type:'combustion', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-1492.0, desc:'White phosphorus ignites spontaneously in air.', safety:'⚠️ PYROPHORIC! Ignites at 34°C!', temp:'Spontaneous >34°C', realUse:'Phosphoric acid, drying agent' },

  // CHLORINE REACTIONS
  { id:'hcl', reactants:['H','Cl'], eq:'H₂ + Cl₂ → HCl', balanced:'H₂ + Cl₂ → 2HCl', products:['Hydrochloric Acid (HCl)'], type:'synthesis', visual:'smoke', color:'hsl(120,40%,50%)', enthalpy:-184.6, desc:'Hydrogen and chlorine form hydrochloric acid.', safety:'⚠️ HCl is corrosive!', temp:'UV or >250°C', realUse:'Industrial HCl, PVC production' },

  // FLUORINE REACTIONS
  { id:'hf', reactants:['H','F'], eq:'H₂ + F₂ → HF', balanced:'H₂ + F₂ → 2HF', products:['Hydrofluoric Acid (HF)'], type:'synthesis', visual:'explosion', color:'hsl(160,50%,60%)', enthalpy:-271.1, desc:'Most violent chemical reaction! Spontaneous even at -250°C!', safety:'⚠️ EXTREMELY DANGEROUS! HF is fatal.', temp:'Spontaneous!', realUse:'Glass etching, Teflon production' },

  // CARBON REACTIONS
  { id:'co2', reactants:['C','O'], eq:'C + O₂ → CO₂', balanced:'C + O₂ → CO₂', products:['Carbon Dioxide (CO₂)'], type:'combustion', visual:'fire', color:'hsl(20,90%,55%)', enthalpy:-393.5, desc:'Carbon combustion — fundamental to energy production.', temp:'Ignition ~700°C', realUse:'Fossil fuel energy, CO₂ production' },
  { id:'ch4', reactants:['C','H'], eq:'C + H₂ → CH₄', balanced:'C + 2H₂ → CH₄', products:['Methane (CH₄)'], type:'synthesis', visual:'gas-release', color:'hsl(180,40%,50%)', enthalpy:-74.8, desc:'Carbon and hydrogen form methane — natural gas.', temp:'>500°C + catalyst', realUse:'Natural gas, fuel, energy' },

  // SILICON REACTIONS
  { id:'sio2', reactants:['Si','O'], eq:'Si + O₂ → SiO₂', balanced:'Si + O₂ → SiO₂', products:['Silicon Dioxide (SiO₂)'], type:'oxidation', visual:'crystallize', color:'hsl(0,0%,88%)', enthalpy:-911.0, desc:'Silicon oxidizes to form quartz/glass.', temp:'>1000°C', realUse:'Glass, semiconductors, sand' },

  // TIN REACTIONS
  { id:'sncl2', reactants:['Sn','Cl'], eq:'Sn + Cl₂ → SnCl₂', balanced:'Sn + Cl₂ → SnCl₂', products:['Tin(II) Chloride'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,70%)', enthalpy:-325.1, desc:'Tin reacts with chlorine forming stannous chloride.', temp:'Room temp', realUse:'Reducing agent, tin plating' },

  // NICKEL REACTIONS
  { id:'nio', reactants:['Ni','O'], eq:'Ni + O₂ → NiO', balanced:'2Ni + O₂ → 2NiO', products:['Nickel Oxide (NiO)'], type:'oxidation', visual:'color-change', color:'hsl(120,20%,30%)', enthalpy:-239.7, desc:'Nickel oxidizes to green-black nickel oxide.', temp:'>400°C', realUse:'Ceramics, batteries, alloys' },

  // COBALT REACTIONS
  { id:'coo', reactants:['Co','O'], eq:'Co + O₂ → Co₃O₄', balanced:'3Co + 2O₂ → Co₃O₄', products:['Cobalt Oxide'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-891.0, desc:'Cobalt forms blue-black oxide.', temp:'>300°C', realUse:'Blue glass, pigments, catalysis' },

  // MANGANESE REACTIONS
  { id:'mno2', reactants:['Mn','O'], eq:'Mn + O₂ → MnO₂', balanced:'Mn + O₂ → MnO₂', products:['Manganese Dioxide'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,15%)', enthalpy:-520.0, desc:'Manganese forms dark MnO₂ — battery material.', temp:'>500°C', realUse:'Dry cell batteries, catalysis' },

  // CHROMIUM REACTIONS
  { id:'cr2o3', reactants:['Cr','O'], eq:'Cr + O₂ → Cr₂O₃', balanced:'4Cr + 3O₂ → 2Cr₂O₃', products:['Chromium(III) Oxide'], type:'oxidation', visual:'color-change', color:'hsl(120,50%,30%)', enthalpy:-1139.7, desc:'Chromium forms green Cr₂O₃ — protective coating.', temp:'>600°C', realUse:'Pigments, stainless steel' },

  // TITANIUM REACTIONS
  { id:'tio2', reactants:['Ti','O'], eq:'Ti + O₂ → TiO₂', balanced:'Ti + O₂ → TiO₂', products:['Titanium Dioxide (TiO₂)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,98%)', enthalpy:-944.0, desc:'TiO₂ — brilliant white pigment used everywhere.', temp:'>600°C', realUse:'White paint, sunscreen, cosmetics' },
  { id:'tin', reactants:['Ti','N'], eq:'Ti + N₂ → TiN', balanced:'2Ti + N₂ → 2TiN', products:['Titanium Nitride (TiN)'], type:'synthesis', visual:'glow', color:'hsl(45,80%,50%)', enthalpy:-337.7, desc:'Golden-colored ceramic coating.', temp:'>1200°C', realUse:'Tool coatings, implants, wear resistance' },

  // VANADIUM REACTIONS
  { id:'v2o5', reactants:['V','O'], eq:'V + O₂ → V₂O₅', balanced:'4V + 5O₂ → 2V₂O₅', products:['Vanadium Pentoxide'], type:'oxidation', visual:'color-change', color:'hsl(50,40%,45%)', enthalpy:-1550.2, desc:'Vanadium forms orange-red V₂O₅.', temp:'>1000°C', realUse:'Catalysts, batteries, alloys' },

  // BARIUM REACTIONS
  { id:'bao', reactants:['Ba','O'], eq:'Ba + O₂ → BaO', balanced:'2Ba + O₂ → 2BaO', products:['Barium Oxide (BaO)'], type:'synthesis', visual:'glow', color:'hsl(120,60%,50%)', enthalpy:-553.5, desc:'Barium burns with characteristic green flame.', safety:'⚠️ All barium compounds are toxic!', temp:'>550°C', realUse:'Fireworks (green), glass, ceramics' },

  // CESIUM REACTIONS
  { id:'csh2o', reactants:['Cs','H'], eq:'Cs + H₂O → CsOH + H₂', balanced:'2Cs + 2H₂O → 2CsOH + H₂↑', products:['CsOH','Hydrogen Gas'], type:'single-replacement', visual:'explosion', color:'hsl(200,70%,55%)', enthalpy:-256.0, desc:'Most violent alkali-water reaction! Massive explosion!', safety:'⚠️ CATASTROPHIC explosion!', temp:'Spontaneous', realUse:'Alkali metal reactivity studies' },

  // RUBIDIUM REACTIONS
  { id:'rbh2o', reactants:['Rb','H'], eq:'Rb + H₂O → RbOH + H₂', balanced:'2Rb + 2H₂O → 2RbOH + H₂↑', products:['RbOH','Hydrogen Gas'], type:'single-replacement', visual:'explosion', color:'hsl(340,60%,55%)', enthalpy:-236.0, desc:'Rubidium reacts explosively with water!', safety:'⚠️ EXPLOSIVE!', temp:'Spontaneous', realUse:'Alkali reactivity series demonstration' },

  // TUNGSTEN REACTIONS
  { id:'wo3', reactants:['W','O'], eq:'W + O₂ → WO₃', balanced:'2W + 3O₂ → 2WO₃', products:['Tungsten Trioxide'], type:'oxidation', visual:'glow', color:'hsl(55,60%,50%)', enthalpy:-842.9, desc:'Tungsten oxidizes at high temp forming yellow WO₃.', temp:'>400°C', realUse:'Smart windows, catalysis, ceramics' },

  // PLATINUM REACTIONS
  { id:'pto2', reactants:['Pt','O'], eq:'Pt + O₂ → PtO₂', balanced:'Pt + O₂ → PtO₂', products:['Platinum Dioxide'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,30%)', enthalpy:-80.0, desc:'Platinum resists oxidation — noble metal catalyst.', temp:'>450°C', realUse:'Catalytic converters, jewelry' },

  // BISMUTH REACTIONS
  { id:'bi2o3', reactants:['Bi','O'], eq:'Bi + O₂ → Bi₂O₃', balanced:'4Bi + 3O₂ → 2Bi₂O₃', products:['Bismuth Oxide'], type:'oxidation', visual:'color-change', color:'hsl(50,40%,50%)', enthalpy:-573.9, desc:'Bismuth forms yellow bismuth oxide.', temp:'>271°C', realUse:'Cosmetics, pharmaceuticals, ceramics' },

  // GOLD REACTIONS
  { id:'aucl3', reactants:['Au','Cl'], eq:'Au + Cl₂ → AuCl₃', balanced:'2Au + 3Cl₂ → 2AuCl₃', products:['Gold Chloride (AuCl₃)'], type:'synthesis', visual:'dissolve', color:'hsl(45,90%,50%)', enthalpy:-117.6, desc:'Gold dissolved by chlorine — gold refining.', safety:'⚠️ Cl₂ is toxic!', temp:'~200°C', realUse:'Gold refining, jewelry chemical processes' },

  // ALUMINUM BROMIDE
  { id:'albr3', reactants:['Al','Br'], eq:'Al + Br₂ → AlBr₃', balanced:'2Al + 3Br₂ → 2AlBr₃', products:['Aluminum Bromide'], type:'synthesis', visual:'smoke', color:'hsl(15,60%,50%)', enthalpy:-527.2, desc:'Vigorous reaction producing smoke.', safety:'⚠️ Bromine is very corrosive!', temp:'Room temp', realUse:'Friedel-Crafts catalyst, synthesis' },
  { id:'beo', reactants:['Be','O'], eq:'Be + O₂ → BeO', balanced:'2Be + O₂ → 2BeO', products:['Beryllium Oxide (BeO)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,90%)', enthalpy:-609.4, desc:'Beryllium oxidizes to form BeO.', temp:'>800°C', realUse:'Ceramics, nuclear applications' },
  { id:'bef2', reactants:['Be','F'], eq:'Be + F₂ → BeF₂', balanced:'Be + F₂ → BeF₂', products:['Beryllium Fluoride (BeF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1022.0, desc:'Beryllium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Be is toxic!', temp:'Room temp', realUse:'Nuclear reactors, research' },
  { id:'becl2', reactants:['Be','Cl'], eq:'Be + Cl₂ → BeCl₂', balanced:'Be + Cl₂ → BeCl₂', products:['Beryllium Chloride (BeCl₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-495.8, desc:'Beryllium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Be is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'bebr2', reactants:['Be','Br'], eq:'Be + Br₂ → BeBr₂', balanced:'Be + Br₂ → BeBr₂', products:['Beryllium Bromide (BeBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-378.2, desc:'Beryllium reacts with bromine.', safety:'⚠️ Br₂ is toxic! Be is toxic!', temp:'Room temp', realUse:'Research, synthesis' },
  { id:'bei2', reactants:['Be','I'], eq:'Be + I₂ → BeI₂', balanced:'Be + I₂ → BeI₂', products:['Beryllium Iodide (BeI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,75%)', enthalpy:-206.3, desc:'Beryllium and iodine form BeI₂.', safety:'⚠️ Be is toxic!', temp:'Room temp', realUse:'Research, synthesis' },
  { id:'mgf2', reactants:['Mg','F'], eq:'Mg + F₂ → MgF₂', balanced:'Mg + F₂ → MgF₂', products:['Magnesium Fluoride (MgF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1124.0, desc:'Magnesium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Optics, ceramics' },
  { id:'mgbr2', reactants:['Mg','Br'], eq:'Mg + Br₂ → MgBr₂', balanced:'Mg + Br₂ → MgBr₂', products:['Magnesium Bromide (MgBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-524.3, desc:'Magnesium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Medicine, synthesis' },
  { id:'mgi2', reactants:['Mg','I'], eq:'Mg + I₂ → MgI₂', balanced:'Mg + I₂ → MgI₂', products:['Magnesium Iodide (MgI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-364.0, desc:'Magnesium and iodine form MgI₂.', temp:'Room temp', realUse:'Organic synthesis, batteries' },
  { id:'caf2', reactants:['Ca','F'], eq:'Ca + F₂ → CaF₂', balanced:'Ca + F₂ → CaF₂', products:['Calcium Fluoride (CaF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1219.6, desc:'Calcium reacts with fluorine forming fluorite.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Optics, metallurgy' },
  { id:'cacl2', reactants:['Ca','Cl'], eq:'Ca + Cl₂ → CaCl₂', balanced:'Ca + Cl₂ → CaCl₂', products:['Calcium Chloride (CaCl₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-795.8, desc:'Calcium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'De-icing, food additive' },
  { id:'cabr2', reactants:['Ca','Br'], eq:'Ca + Br₂ → CaBr₂', balanced:'Ca + Br₂ → CaBr₂', products:['Calcium Bromide (CaBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-675.3, desc:'Calcium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Oil drilling, medicine' },
  { id:'cai2', reactants:['Ca','I'], eq:'Ca + I₂ → CaI₂', balanced:'Ca + I₂ → CaI₂', products:['Calcium Iodide (CaI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,75%)', enthalpy:-533.5, desc:'Calcium and iodine form CaI₂.', temp:'Room temp', realUse:'Photography, medicine' },
  { id:'sro', reactants:['Sr','O'], eq:'Sr + O₂ → SrO', balanced:'2Sr + O₂ → 2SrO', products:['Strontium Oxide (SrO)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,85%)', enthalpy:-592.0, desc:'Strontium burns forming SrO.', temp:'>300°C', realUse:'Fireworks, ceramics' },
  { id:'srf2', reactants:['Sr','F'], eq:'Sr + F₂ → SrF₂', balanced:'Sr + F₂ → SrF₂', products:['Strontium Fluoride (SrF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-1217.0, desc:'Strontium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'srcl2', reactants:['Sr','Cl'], eq:'Sr + Cl₂ → SrCl₂', balanced:'Sr + Cl₂ → SrCl₂', products:['Strontium Chloride (SrCl₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-828.4, desc:'Strontium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Fireworks, medicine' },
  { id:'srbr2', reactants:['Sr','Br'], eq:'Sr + Br₂ → SrBr₂', balanced:'Sr + Br₂ → SrBr₂', products:['Strontium Bromide (SrBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-709.6, desc:'Strontium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'sri2', reactants:['Sr','I'], eq:'Sr + I₂ → SrI₂', balanced:'Sr + I₂ → SrI₂', products:['Strontium Iodide (SrI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-566.9, desc:'Strontium and iodine form SrI₂.', temp:'Room temp', realUse:'Research, optics' },
  { id:'baf2', reactants:['Ba','F'], eq:'Ba + F₂ → BaF₂', balanced:'Ba + F₂ → BaF₂', products:['Barium Fluoride (BaF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-1203.0, desc:'Barium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Optics, scintillation' },
  { id:'bacl2', reactants:['Ba','Cl'], eq:'Ba + Cl₂ → BaCl₂', balanced:'Ba + Cl₂ → BaCl₂', products:['Barium Chloride (BaCl₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-858.6, desc:'Barium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Fireworks, water softening' },
  { id:'babr2', reactants:['Ba','Br'], eq:'Ba + Br₂ → BaBr₂', balanced:'Ba + Br₂ → BaBr₂', products:['Barium Bromide (BaBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-743.5, desc:'Barium reacts with bromine.', safety:'⚠️ Br₂ is toxic! Ba is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'bai2', reactants:['Ba','I'], eq:'Ba + I₂ → BaI₂', balanced:'Ba + I₂ → BaI₂', products:['Barium Iodide (BaI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-602.1, desc:'Barium and iodine form BaI₂.', safety:'⚠️ Ba is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'rao', reactants:['Ra','O'], eq:'Ra + O₂ → RaO', balanced:'2Ra + O₂ → 2RaO', products:['Radium Oxide (RaO)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,80%)', enthalpy:-530.0, desc:'Radium oxidizes to RaO.', safety:'⚠️ Ra is radioactive!', temp:'>100°C', realUse:'Research, historical' },
  { id:'raf2', reactants:['Ra','F'], eq:'Ra + F₂ → RaF₂', balanced:'Ra + F₂ → RaF₂', products:['Radium Fluoride (RaF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-1200.0, desc:'Radium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Ra is radioactive!', temp:'Room temp', realUse:'Research' },
  { id:'racl2', reactants:['Ra','Cl'], eq:'Ra + Cl₂ → RaCl₂', balanced:'Ra + Cl₂ → RaCl₂', products:['Radium Chloride (RaCl₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-850.0, desc:'Radium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Ra is radioactive!', temp:'Room temp', realUse:'Research' },
  { id:'rabr2', reactants:['Ra','Br'], eq:'Ra + Br₂ → RaBr₂', balanced:'Ra + Br₂ → RaBr₂', products:['Radium Bromide (RaBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-735.0, desc:'Radium reacts with bromine.', safety:'⚠️ Br₂ is toxic! Ra is radioactive!', temp:'Room temp', realUse:'Research' },
  { id:'rai2', reactants:['Ra','I'], eq:'Ra + I₂ → RaI₂', balanced:'Ra + I₂ → RaI₂', products:['Radium Iodide (RaI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,65%)', enthalpy:-595.0, desc:'Radium and iodine form RaI₂.', safety:'⚠️ Ra is radioactive!', temp:'Room temp', realUse:'Research' },
  { id:'b2o3', reactants:['B','O'], eq:'B + O₂ → B₂O₃', balanced:'4B + 3O₂ → 2B₂O₃', products:['Boric Oxide (B₂O₃)'], type:'oxidation', visual:'glow', color:'hsl(0,0%,90%)', enthalpy:-1273.0, desc:'Boron burns to form boric oxide.', temp:'>700°C', realUse:'Glass, ceramics' },
  { id:'bf3', reactants:['B','F'], eq:'B + F₂ → BF₃', balanced:'2B + 3F₂ → 2BF₃', products:['Boron Trifluoride (BF₃)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1136.0, desc:'Boron reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'bcl3', reactants:['B','Cl'], eq:'B + Cl₂ → BCl₃', balanced:'2B + 3Cl₂ → 2BCl₃', products:['Boron Trichloride (BCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-427.0, desc:'Boron reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Catalysis, semiconductors' },
  { id:'ga2o3', reactants:['Ga','O'], eq:'Ga + O₂ → Ga₂O₃', balanced:'4Ga + 3O₂ → 2Ga₂O₃', products:['Gallium Oxide (Ga₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,85%)', enthalpy:-1089.0, desc:'Gallium oxidizes to Ga₂O₃.', temp:'>200°C', realUse:'LEDs, semiconductors' },
  { id:'gaf3', reactants:['Ga','F'], eq:'Ga + F₂ → GaF₃', balanced:'2Ga + 3F₂ → 2GaF₃', products:['Gallium Trifluoride (GaF₃)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-1163.0, desc:'Gallium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, catalysis' },
  { id:'gacl3', reactants:['Ga','Cl'], eq:'Ga + Cl₂ → GaCl₃', balanced:'2Ga + 3Cl₂ → 2GaCl₃', products:['Gallium Trichloride (GaCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-523.0, desc:'Gallium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Semiconductors, research' },
  { id:'in2o3', reactants:['In','O'], eq:'In + O₂ → In₂O₃', balanced:'4In + 3O₂ → 2In₂O₃', products:['Indium Oxide (In₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,80%)', enthalpy:-925.0, desc:'Indium oxidizes to In₂O₃.', temp:'>200°C', realUse:'Transparent conductors, LCDs' },
  { id:'inf3', reactants:['In','F'], eq:'In + F₂ → InF₃', balanced:'2In + 3F₂ → 2InF₃', products:['Indium Trifluoride (InF₃)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-1190.0, desc:'Indium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'incl3', reactants:['In','Cl'], eq:'In + Cl₂ → InCl₃', balanced:'2In + 3Cl₂ → 2InCl₃', products:['Indium Trichloride (InCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-537.0, desc:'Indium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'tl2o3', reactants:['Tl','O'], eq:'Tl + O₂ → Tl₂O₃', balanced:'4Tl + 3O₂ → 2Tl₂O₃', products:['Thallium Oxide (Tl₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-390.0, desc:'Thallium oxidizes to Tl₂O₃.', safety:'⚠️ Tl is toxic!', temp:'>100°C', realUse:'Research, optics' },
  { id:'tlf', reactants:['Tl','F'], eq:'Tl + F₂ → TlF', balanced:'2Tl + F₂ → 2TlF', products:['Thallium Fluoride (TlF)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-327.0, desc:'Thallium reacts with fluorine.', safety:'⚠️ F₂ is toxic! Tl is toxic!', temp:'Room temp', realUse:'Research' },
  { id:'tlcl', reactants:['Tl','Cl'], eq:'Tl + Cl₂ → TlCl', balanced:'2Tl + Cl₂ → 2TlCl', products:['Thallium Chloride (TlCl)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-205.0, desc:'Thallium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! Tl is toxic!', temp:'Room temp', realUse:'Research' },
  { id:'cn2', reactants:['C','N'], eq:'C + N₂ → CN₂', balanced:'C + N₂ → CN₂', products:['Cyanogen (CN₂)'], type:'synthesis', visual:'gas-release', color:'hsl(180,40%,50%)', enthalpy:306.0, desc:'Carbon and nitrogen form cyanogen.', safety:'⚠️ CN₂ is toxic!', temp:'>1000°C', realUse:'Research, synthesis' },
  { id:'sif4', reactants:['Si','F'], eq:'Si + F₂ → SiF₄', balanced:'Si + 2F₂ → SiF₄', products:['Silicon Tetrafluoride (SiF₄)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-1615.0, desc:'Silicon reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Semiconductors, research' },
  { id:'sic', reactants:['Si','C'], eq:'Si + C → SiC', balanced:'Si + C → SiC', products:['Silicon Carbide (SiC)'], type:'synthesis', visual:'glow', color:'hsl(0,0%,85%)', enthalpy:-73.0, desc:'Silicon and carbon form SiC.', temp:'>1600°C', realUse:'Abrasives, ceramics' },
  { id:'sin', reactants:['Si','N'], eq:'Si + N₂ → Si₃N₄', balanced:'3Si + 2N₂ → Si₃N₄', products:['Silicon Nitride (Si₃N₄)'], type:'synthesis', visual:'glow', color:'hsl(0,0%,90%)', enthalpy:-743.0, desc:'Silicon reacts with nitrogen.', temp:'>1300°C', realUse:'Ceramics, electronics' },
  { id:'p4o10', reactants:['P','O'], eq:'P + O₂ → P₄O₁₀', balanced:'P₄ + 5O₂ → P₄O₁₀', products:['Phosphorus Pentoxide (P₄O₁₀)'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-2984.0, desc:'Phosphorus burns to P₄O₁₀.', safety:'⚠️ Toxic!', temp:'Ignition ~34°C', realUse:'Phosphoric acid' },
  { id:'pf3', reactants:['P','F'], eq:'P + F₂ → PF₃', balanced:'2P + 3F₂ → 2PF₃', products:['Phosphorus Trifluoride (PF₃)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-958.0, desc:'Phosphorus reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'pcl3', reactants:['P','Cl'], eq:'P + Cl₂ → PCl₃', balanced:'2P + 3Cl₂ → 2PCl₃', products:['Phosphorus Trichloride (PCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-319.0, desc:'Phosphorus reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Organic synthesis' },
  { id:'as2o3', reactants:['As','O'], eq:'As + O₂ → As₂O₃', balanced:'4As + 3O₂ → 2As₂O₃', products:['Arsenic Trioxide (As₂O₃)'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-657.0, desc:'Arsenic oxidizes to As₂O₃.', safety:'⚠️ As is toxic!', temp:'>200°C', realUse:'Glass, pesticides' },
  { id:'asf3', reactants:['As','F'], eq:'As + F₂ → AsF₃', balanced:'2As + 3F₂ → 2AsF₃', products:['Arsenic Trifluoride (AsF₃)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-821.0, desc:'Arsenic reacts with fluorine.', safety:'⚠️ F₂ is toxic! As is toxic!', temp:'Room temp', realUse:'Research' },
  { id:'ascl3', reactants:['As','Cl'], eq:'As + Cl₂ → AsCl₃', balanced:'2As + 3Cl₂ → 2AsCl₃', products:['Arsenic Trichloride (AsCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-305.0, desc:'Arsenic reacts with chlorine.', safety:'⚠️ Cl₂ is toxic! As is toxic!', temp:'Room temp', realUse:'Semiconductors' },
  { id:'se2o3', reactants:['Se','O'], eq:'Se + O₂ → SeO₂', balanced:'Se + O₂ → SeO₂', products:['Selenium Dioxide (SeO₂)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,80%)', enthalpy:-230.0, desc:'Selenium oxidizes to SeO₂.', temp:'>200°C', realUse:'Catalysis, glass' },
  { id:'sef4', reactants:['Se','F'], eq:'Se + F₂ → SeF₄', balanced:'Se + 2F₂ → SeF₄', products:['Selenium Tetrafluoride (SeF₄)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-850.0, desc:'Selenium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research' },
  { id:'lif', reactants:['Li','F'], eq:'Li + F₂ → LiF', balanced:'2Li + F₂ → 2LiF', products:['Lithium Fluoride (LiF)'], type:'synthesis', visual:'spark', color:'hsl(180,70%,60%)', enthalpy:-616.0, desc:'Lithium reacts vigorously with fluorine gas forming LiF.', safety:'⚠️ Violent! F₂ is extremely toxic.', temp:'Room temp', realUse:'Nuclear reactors, ceramics' },
  { id:'licl', reactants:['Li','Cl'], eq:'Li + Cl₂ → LiCl', balanced:'2Li + Cl₂ → 2LiCl', products:['Lithium Chloride (LiCl)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-408.6, desc:'Lithium burns in chlorine gas.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Batteries, air conditioning' },
  { id:'libr', reactants:['Li','Br'], eq:'Li + Br₂ → LiBr', balanced:'2Li + Br₂ → 2LiBr', products:['Lithium Bromide (LiBr)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-351.2, desc:'Lithium reacts with bromine producing heat and smoke.', safety:'⚠️ Br₂ is corrosive!', temp:'Room temp', realUse:'Medicine, photography' },
  { id:'lii', reactants:['Li','I'], eq:'Li + I₂ → LiI', balanced:'2Li + I₂ → 2LiI', products:['Lithium Iodide (LiI)'], type:'synthesis', visual:'color-change', color:'hsl(45,60%,70%)', enthalpy:-270.4, desc:'Lithium and iodine form LiI.', temp:'Room temp', realUse:'Organic synthesis, electrolytes' },
  { id:'naf', reactants:['Na','F'], eq:'Na + F₂ → NaF', balanced:'2Na + F₂ → 2NaF', products:['Sodium Fluoride (NaF)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,95%)', enthalpy:-575.3, desc:'Sodium reacts with fluorine forming NaF.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Toothpaste, water fluoridation' },
  { id:'nai', reactants:['Na','I'], eq:'Na + I₂ → NaI', balanced:'2Na + I₂ → 2NaI', products:['Sodium Iodide (NaI)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,80%)', enthalpy:-288.0, desc:'Sodium and iodine form NaI.', temp:'Room temp', realUse:'Medicine, photography' },
  { id:'kbr', reactants:['K','Br'], eq:'K + Br₂ → KBr', balanced:'2K + Br₂ → 2KBr', products:['Potassium Bromide (KBr)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-393.8, desc:'Potassium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Sedatives, photography' },
  { id:'ki', reactants:['K','I'], eq:'K + I₂ → KI', balanced:'2K + I₂ → 2KI', products:['Potassium Iodide (KI)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,75%)', enthalpy:-327.9, desc:'Potassium and iodine form KI.', temp:'Room temp', realUse:'Iodine supplement, thyroid treatment' },
  { id:'rbf', reactants:['Rb','F'], eq:'Rb + F₂ → RbF', balanced:'2Rb + F₂ → 2RbF', products:['Rubidium Fluoride (RbF)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-549.0, desc:'Rubidium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, atomic clocks' },
  { id:'rbcl', reactants:['Rb','Cl'], eq:'Rb + Cl₂ → RbCl', balanced:'2Rb + Cl₂ → 2RbCl', products:['Rubidium Chloride (RbCl)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-430.5, desc:'Rubidium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Biochemistry, research' },
  { id:'rbbr', reactants:['Rb','Br'], eq:'Rb + Br₂ → RbBr', balanced:'2Rb + Br₂ → 2RbBr', products:['Rubidium Bromide (RbBr)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-389.1, desc:'Rubidium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'rbi', reactants:['Rb','I'], eq:'Rb + I₂ → RbI', balanced:'2Rb + I₂ → 2RbI', products:['Rubidium Iodide (RbI)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-333.9, desc:'Rubidium and iodine form RbI.', temp:'Room temp', realUse:'Research, optics' },
  { id:'csf', reactants:['Cs','F'], eq:'Cs + F₂ → CsF', balanced:'2Cs + F₂ → 2CsF', products:['Cesium Fluoride (CsF)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-530.9, desc:'Cesium reacts with fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'cscl', reactants:['Cs','Cl'], eq:'Cs + Cl₂ → CsCl', balanced:'2Cs + Cl₂ → 2CsCl', products:['Cesium Chloride (CsCl)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-433.0, desc:'Cesium reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Crystallography, medicine' },
  { id:'csbr', reactants:['Cs','Br'], eq:'Cs + Br₂ → CsBr', balanced:'2Cs + Br₂ → 2CsBr', products:['Cesium Bromide (CsBr)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-395.4, desc:'Cesium reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, optics' },
  { id:'csi', reactants:['Cs','I'], eq:'Cs + I₂ → CsI', balanced:'2Cs + I₂ → 2CsI', products:['Cesium Iodide (CsI)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,65%)', enthalpy:-346.0, desc:'Cesium and iodine form CsI.', temp:'Room temp', realUse:'Scintillators, research' },

  // ZINC REACTIONS (additional)
  { id:'zncl2', reactants:['Zn','Cl'], eq:'Zn + Cl₂ → ZnCl₂', balanced:'Zn + Cl₂ → ZnCl₂', products:['Zinc Chloride (ZnCl₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-415.1, desc:'Zinc reacts with chlorine gas.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Flux, batteries' },
  { id:'znbr2', reactants:['Zn','Br'], eq:'Zn + Br₂ → ZnBr₂', balanced:'Zn + Br₂ → ZnBr₂', products:['Zinc Bromide (ZnBr₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-329.7, desc:'Zinc reacts with bromine.', safety:'⚠️ Br₂ is toxic!', temp:'Room temp', realUse:'Research, medicine' },
  { id:'zni2', reactants:['Zn','I'], eq:'Zn + I₂ → ZnI₂', balanced:'Zn + I₂ → ZnI₂', products:['Zinc Iodide (ZnI₂)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,70%)', enthalpy:-208.0, desc:'Zinc and iodine form ZnI₂.', temp:'Room temp', realUse:'Catalysis, research' },
  { id:'zns', reactants:['Zn','S'], eq:'Zn + S → ZnS', balanced:'Zn + S → ZnS', products:['Zinc Sulfide (ZnS)'], type:'synthesis', visual:'glow', color:'hsl(60,60%,60%)', enthalpy:-206.0, desc:'Zinc and sulfur form ZnS.', temp:'~800°C', realUse:'Phosphors, pigments' },

  // MERCURY REACTIONS
  { id:'hgo', reactants:['Hg','O'], eq:'Hg + O₂ → HgO', balanced:'2Hg + O₂ → 2HgO', products:['Mercury(II) Oxide (HgO)'], type:'oxidation', visual:'color-change', color:'hsl(15,60%,40%)', enthalpy:-90.8, desc:'Mercury oxidizes to red HgO.', safety:'⚠️ Hg is toxic!', temp:'>300°C', realUse:'Batteries, pigments' },
  { id:'hgcl2', reactants:['Hg','Cl'], eq:'Hg + Cl₂ → HgCl₂', balanced:'Hg + Cl₂ → HgCl₂', products:['Mercury(II) Chloride (HgCl₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,85%)', enthalpy:-230.1, desc:'Mercury reacts with chlorine.', safety:'⚠️ Cl₂ and Hg are toxic!', temp:'Room temp', realUse:'Catalysis, medicine' },
  { id:'hgs', reactants:['Hg','S'], eq:'Hg + S → HgS', balanced:'Hg + S → HgS', products:['Mercury Sulfide (HgS)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-58.2, desc:'Mercury and sulfur form black HgS.', safety:'⚠️ Hg is toxic!', temp:'Room temp', realUse:'Pigments, detectors' },

  // LEAD REACTIONS
  { id:'pbo', reactants:['Pb','O'], eq:'Pb + O₂ → PbO', balanced:'2Pb + O₂ → 2PbO', products:['Lead(II) Oxide (PbO)'], type:'oxidation', visual:'color-change', color:'hsl(30,40%,50%)', enthalpy:-219.0, desc:'Lead oxidizes to PbO.', safety:'⚠️ Pb is toxic!', temp:'>300°C', realUse:'Glass, batteries' },
  { id:'pbcl2', reactants:['Pb','Cl'], eq:'Pb + Cl₂ → PbCl₂', balanced:'Pb + Cl₂ → PbCl₂', products:['Lead(II) Chloride (PbCl₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-359.4, desc:'Lead reacts with chlorine.', safety:'⚠️ Cl₂ and Pb are toxic!', temp:'Room temp', realUse:'Research, pigments' },
  { id:'pbs', reactants:['Pb','S'], eq:'Pb + S → PbS', balanced:'Pb + S → PbS', products:['Lead Sulfide (PbS)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,15%)', enthalpy:-94.3, desc:'Lead and sulfur form PbS.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Detectors, pigments' },

  // SILVER REACTIONS
  { id:'agcl', reactants:['Ag','Cl'], eq:'Ag + Cl₂ → AgCl', balanced:'2Ag + Cl₂ → 2AgCl', products:['Silver Chloride (AgCl)'], type:'synthesis', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-127.0, desc:'Silver reacts with chlorine forming white precipitate.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Photography, mirrors' },
  { id:'ags', reactants:['Ag','S'], eq:'Ag + S → Ag₂S', balanced:'2Ag + S → Ag₂S', products:['Silver Sulfide (Ag₂S)'], type:'synthesis', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-32.6, desc:'Silver and sulfur form Ag₂S.', temp:'Room temp', realUse:'Jewelry, detectors' },

  // CADMIUM REACTIONS
  { id:'cdo', reactants:['Cd','O'], eq:'Cd + O₂ → CdO', balanced:'2Cd + O₂ → 2CdO', products:['Cadmium Oxide (CdO)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,25%)', enthalpy:-258.4, desc:'Cadmium oxidizes to CdO.', safety:'⚠️ Cd is toxic!', temp:'>300°C', realUse:'Batteries, pigments' },
  { id:'cdcl2', reactants:['Cd','Cl'], eq:'Cd + Cl₂ → CdCl₂', balanced:'Cd + Cl₂ → CdCl₂', products:['Cadmium Chloride (CdCl₂)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-391.5, desc:'Cadmium reacts with chlorine.', safety:'⚠️ Cl₂ and Cd are toxic!', temp:'Room temp', realUse:'Electroplating, research' },

  // TIN REACTIONS (additional)
  { id:'sno2', reactants:['Sn','O'], eq:'Sn + O₂ → SnO₂', balanced:'Sn + O₂ → SnO₂', products:['Tin(IV) Oxide (SnO₂)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,90%)', enthalpy:-580.7, desc:'Tin oxidizes to SnO₂.', temp:'>1000°C', realUse:'Glass, ceramics' },

  // ANTIMONY REACTIONS
  { id:'sb2o3', reactants:['Sb','O'], eq:'Sb + O₂ → Sb₂O₃', balanced:'4Sb + 3O₂ → 2Sb₂O₃', products:['Antimony Trioxide (Sb₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,85%)', enthalpy:-699.6, desc:'Antimony oxidizes to Sb₂O₃.', temp:'>600°C', realUse:'Flame retardants, glass' },

  // BISMUTH REACTIONS (additional)
  { id:'bicl3', reactants:['Bi','Cl'], eq:'Bi + Cl₂ → BiCl₃', balanced:'2Bi + 3Cl₂ → 2BiCl₃', products:['Bismuth Chloride (BiCl₃)'], type:'synthesis', visual:'smoke', color:'hsl(0,0%,75%)', enthalpy:-379.1, desc:'Bismuth reacts with chlorine.', safety:'⚠️ Cl₂ is toxic!', temp:'Room temp', realUse:'Catalysis, research' },

  // ACID-BASE REACTIONS
  { id:'hclnaoh', reactants:['H','Cl','Na','O','H'], eq:'HCl + NaOH → NaCl + H₂O', balanced:'HCl + NaOH → NaCl + H₂O', products:['Sodium Chloride','Water'], type:'acid-base', visual:'dissolve', color:'hsl(200,50%,70%)', enthalpy:-55.8, desc:'Neutralization: acid + base → salt + water.', temp:'Room temp', realUse:'pH control, salt production' },
  { id:'h2so4caoh2', reactants:['H','S','O','Ca','O','H'], eq:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', balanced:'H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O', products:['Calcium Sulfate','Water'], type:'acid-base', visual:'precipitate', color:'hsl(0,0%,90%)', enthalpy:-106.7, desc:'Sulfuric acid neutralizes calcium hydroxide.', temp:'Room temp', realUse:'Gypsum production, water treatment' },
  { id:'hno3koh', reactants:['H','N','O','K','O','H'], eq:'HNO₃ + KOH → KNO₃ + H₂O', balanced:'HNO₃ + KOH → KNO₃ + H₂O', products:['Potassium Nitrate','Water'], type:'acid-base', visual:'dissolve', color:'hsl(45,60%,70%)', enthalpy:-57.3, desc:'Nitric acid neutralizes potassium hydroxide.', temp:'Room temp', realUse:'Fertilizer, explosives' },

  // PRECIPITATION REACTIONS
  { id:'agno3nacl', reactants:['Ag','N','O','Na','Cl'], eq:'AgNO₃ + NaCl → AgCl + NaNO₃', balanced:'AgNO₃ + NaCl → AgCl↓ + NaNO₃', products:['Silver Chloride (precipitate)'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,75%)', enthalpy:-33.4, desc:'Double replacement forms insoluble AgCl.', temp:'Room temp', realUse:'Qualitative analysis, photography' },
  { id:'pbno32nacl', reactants:['Pb','N','O','Na','Cl'], eq:'Pb(NO₃)₂ + 2NaCl → PbCl₂ + 2NaNO₃', balanced:'Pb(NO₃)₂ + 2NaCl → PbCl₂↓ + 2NaNO₃', products:['Lead Chloride (precipitate)'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,80%)', enthalpy:-26.8, desc:'Lead chloride precipitates from solution.', safety:'⚠️ Pb is toxic!', temp:'Room temp', realUse:'Research, pigments' },
  { id:'bacl2na2so4', reactants:['Ba','Cl','Na','S','O'], eq:'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl', balanced:'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', products:['Barium Sulfate (precipitate)'], type:'precipitation', visual:'precipitate', color:'hsl(0,0%,95%)', enthalpy:-35.7, desc:'Barium sulfate forms white precipitate.', temp:'Room temp', realUse:'X-ray contrast, paints' },

  // REDOX REACTIONS
  { id:'kmno4fe2', reactants:['K','Mn','O','Fe'], eq:'KMnO₄ + FeSO₄ → MnO₂ + Fe₂(SO₄)₃ + K₂SO₄', balanced:'2KMnO₄ + 10FeSO₄ + 8H₂SO₄ → 2MnSO₄ + 5Fe₂(SO₄)₃ + K₂SO₄ + 8H₂O', products:['Manganese Dioxide','Iron(III) Sulfate'], type:'redox', visual:'color-change', color:'hsl(0,0%,20%)', enthalpy:-165.0, desc:'Potassium permanganate oxidizes iron(II).', temp:'Room temp', realUse:'Analytical chemistry, water treatment' },
  { id:'h2o2mno2', reactants:['H','O','Mn','O'], eq:'H₂O₂ + MnO₂ → MnO₄⁻ + H₂O', balanced:'3H₂O₂ + 2MnO₂ → 2MnO₄⁻ + 2H₂O + 2H⁺', products:['Permanganate Ion','Water'], type:'redox', visual:'color-change', color:'hsl(300,60%,50%)', enthalpy:-76.0, desc:'Hydrogen peroxide oxidizes manganese dioxide.', temp:'Room temp', realUse:'Rocket fuel, bleaching' },

  // COMPLEX FORMATION
  { id:'cu2ag', reactants:['Cu','Ag'], eq:'Cu²⁺ + 2Ag → Cu + 2Ag⁺', balanced:'Cu²⁺ + 2Ag → Cu + 2Ag⁺', products:['Copper Metal','Silver Ion'], type:'redox', visual:'precipitate', color:'hsl(45,80%,60%)', enthalpy:-146.0, desc:'Copper displaces silver from solution.', temp:'Room temp', realUse:'Silver recovery, electroplating' },

  // ORGANIC REACTIONS
  { id:'ch4o2', reactants:['C','H','O'], eq:'CH₄ + 2O₂ → CO₂ + 2H₂O', balanced:'CH₄ + 2O₂ → CO₂ + 2H₂O', products:['Carbon Dioxide','Water'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-890.4, desc:'Methane combustion — natural gas burning.', temp:'Ignition ~595°C', realUse:'Heating, cooking, energy', smiles:'C' },
  { id:'c2h5oho2', reactants:['C','H','O'], eq:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', balanced:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O', products:['Carbon Dioxide','Water'], type:'combustion', visual:'fire', color:'hsl(30,60%,70%)', enthalpy:-1366.8, desc:'Ethanol combustion — alcohol burning.', temp:'Ignition ~365°C', realUse:'Fuel, spirits', smiles:'CCO' },
  { id:'c6h12o6o2', reactants:['C','H','O'], eq:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products:['Carbon Dioxide','Water'], type:'combustion', visual:'fire', color:'hsl(0,0%,95%)', enthalpy:-2808.0, desc:'Glucose combustion — cellular respiration.', temp:'Room temp (enzymatic)', realUse:'Metabolism, baking', smiles:'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O' },

  // NUCLEAR REACTIONS (simplified)
  { id:'u235n', reactants:['U','n'], eq:'²³⁵U + n → ¹⁴²Ba + ⁹²Kr + 3n', balanced:'²³⁵U + n → ¹⁴²Ba + ⁹²Kr + 3n', products:['Barium-142','Krypton-92','Neutrons'], type:'redox', visual:'explosion', color:'hsl(60,100%,70%)', enthalpy:-2.0e8, desc:'Nuclear fission of uranium-235.', safety:'⚠️ RADIOACTIVE!', temp:'Critical mass', realUse:'Nuclear power, weapons' },

  // PHOTOSYNTHESIS
  { id:'photosynthesis', reactants:['C','H','O'], eq:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', balanced:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', products:['Glucose','Oxygen'], type:'synthesis', visual:'glow', color:'hsl(120,60%,50%)', enthalpy:2808.0, desc:'Plants convert CO₂ and water to glucose using sunlight.', temp:'Room temp (with chlorophyll)', realUse:'Food production, oxygen generation' },

  // INDUSTRIAL REACTIONS
  { id:'haberbosch', reactants:['N','H'], eq:'N₂ + 3H₂ → 2NH₃', balanced:'N₂ + 3H₂ ⇌ 2NH₃', products:['Ammonia'], type:'synthesis', visual:'gas-release', color:'hsl(200,40%,60%)', enthalpy:-92.4, desc:'Haber-Bosch process for ammonia synthesis.', temp:'400-500°C, 200 atm', catalyst:'Fe', realUse:'Fertilizers, explosives', smiles:'N' },
  { id:'contactprocess', reactants:['S','O'], eq:'2SO₂ + O₂ → 2SO₃', balanced:'2SO₂ + O₂ ⇌ 2SO₃', products:['Sulfur Trioxide'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,90%)', enthalpy:-198.2, desc:'Contact process for sulfuric acid production.', temp:'400-600°C', catalyst:'V₂O₅', realUse:'Sulfuric acid, detergents' },
  { id:'ostwald', reactants:['N','H','O'], eq:'4NH₃ + 5O₂ → 4NO + 6H₂O', balanced:'4NH₃ + 5O₂ → 4NO + 6H₂O', products:['Nitric Oxide','Water'], type:'oxidation', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:-905.6, desc:'Ostwald process first step for nitric acid.', temp:'800-900°C', catalyst:'Pt-Rh', realUse:'Nitric acid, fertilizers' },

  // BIOCHEMICAL REACTIONS
  { id:'fermentation', reactants:['C','H','O'], eq:'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', balanced:'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', products:['Ethanol','Carbon Dioxide'], type:'decomposition', visual:'bubbles', color:'hsl(45,60%,70%)', enthalpy:-67.0, desc:'Yeast fermentation of glucose to ethanol.', temp:'30-37°C', realUse:'Beer, wine, bread' },
  { id:'respiration', reactants:['C','H','O'], eq:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', balanced:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O', products:['Carbon Dioxide','Water'], type:'combustion', visual:'gas-release', color:'hsl(0,0%,95%)', enthalpy:-2808.0, desc:'Aerobic respiration in cells.', temp:'37°C', realUse:'Energy production in organisms' },

  // CATALYTIC REACTIONS
  { id:'catalyticcracking', reactants:['C','H'], eq:'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', balanced:'C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', products:['Octane','Octene'], type:'decomposition', visual:'smoke', color:'hsl(0,0%,80%)', enthalpy:50.0, desc:'Catalytic cracking of hydrocarbons.', temp:'500°C', catalyst:'Zeolite', realUse:'Petroleum refining, gasoline' },

  // ELECTROCHEMICAL REACTIONS
  { id:'electrolysis', reactants:['H','O'], eq:'2H₂O → 2H₂ + O₂', balanced:'2H₂O → 2H₂↑ + O₂↑', products:['Hydrogen Gas','Oxygen Gas'], type:'decomposition', visual:'bubbles', color:'hsl(200,60%,70%)', enthalpy:285.8, desc:'Water electrolysis produces hydrogen and oxygen.', temp:'Room temp', realUse:'Hydrogen fuel, oxygen production' },
  { id:'danielcell', reactants:['Zn','Cu'], eq:'Zn + Cu²⁺ → Zn²⁺ + Cu', balanced:'Zn + Cu²⁺ → Zn²⁺ + Cu', products:['Zinc Ion','Copper Metal'], type:'redox', visual:'color-change', color:'hsl(45,80%,60%)', enthalpy:-212.0, desc:'Daniel cell: zinc anode, copper cathode.', temp:'Room temp', realUse:'Batteries, electrochemistry teaching' },

  // HIGH-TEMPERATURE REACTIONS
  { id:'limekiln', reactants:['Ca','C','O'], eq:'CaCO₃ → CaO + CO₂', balanced:'CaCO₃ → CaO + CO₂↑', products:['Calcium Oxide','Carbon Dioxide'], type:'decomposition', visual:'gas-release', color:'hsl(0,0%,90%)', enthalpy:178.0, desc:'Limestone decomposition in lime kilns.', temp:'900°C', realUse:'Cement, steelmaking' },
  { id:'blastfurnace', reactants:['Fe','C','O'], eq:'Fe₂O₃ + 3CO → 2Fe + 3CO₂', balanced:'Fe₂O₃ + 3CO → 2Fe + 3CO₂', products:['Iron Metal','Carbon Dioxide'], type:'redox', visual:'glow', color:'hsl(15,70%,45%)', enthalpy:-26.8, desc:'Iron reduction in blast furnace.', temp:'1500°C', realUse:'Steel production' },

  // ATMOSPHERIC REACTIONS
  { id:'ozoneformation', reactants:['O'], eq:'3O₂ → 2O₃', balanced:'3O₂ → 2O₃', products:['Ozone'], type:'synthesis', visual:'glow', color:'hsl(200,60%,60%)', enthalpy:142.0, desc:'Ozone formation from oxygen in atmosphere.', temp:'High energy (UV)', realUse:'Ozone layer, air purification' },
  { id:'acidrain', reactants:['S','O','H','O'], eq:'SO₂ + H₂O → H₂SO₃', balanced:'SO₂ + H₂O → H₂SO₃', products:['Sulfurous Acid'], type:'acid-base', visual:'dissolve', color:'hsl(0,0%,85%)', enthalpy:-52.0, desc:'Sulfur dioxide forms acid in water vapor.', temp:'Room temp', realUse:'Acid rain formation' },

  // EXPLOSIVE REACTIONS
  { id:'blackpowder', reactants:['K','C','S','O'], eq:'2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', balanced:'2KNO₃ + 3C + S → K₂S + N₂ + 3CO₂', products:['Potassium Sulfide','Nitrogen','Carbon Dioxide'], type:'redox', visual:'explosion', color:'hsl(0,0%,20%)', enthalpy:-600.0, desc:'Black powder explosion reaction.', safety:'⚠️ EXPLOSIVE!', temp:'Ignition ~300°C', realUse:'Fireworks, mining' },
  { id:'tnt', reactants:['C','H','N','O'], eq:'2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', balanced:'2C₇H₅N₃O₆ → 3N₂ + 5H₂O + 7CO + 7C', products:['Nitrogen','Water','Carbon Monoxide','Carbon'], type:'decomposition', visual:'explosion', color:'hsl(45,60%,50%)', enthalpy:-2800.0, desc:'TNT detonation reaction.', safety:'⚠️ HIGH EXPLOSIVE!', temp:'Detonation', realUse:'Explosives, demolition' },

  // RARE EARTH REACTIONS
  { id:'la2o3', reactants:['La','O'], eq:'La + O₂ → La₂O₃', balanced:'4La + 3O₂ → 2La₂O₃', products:['Lanthanum Oxide (La₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(0,0%,85%)', enthalpy:-1794.0, desc:'Lanthanum oxidizes to La₂O₃.', temp:'>400°C', realUse:'Catalysts, optics' },
  { id:'ce2o3', reactants:['Ce','O'], eq:'Ce + O₂ → Ce₂O₃', balanced:'4Ce + 3O₂ → 2Ce₂O₃', products:['Cerium Oxide (Ce₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(50,40%,60%)', enthalpy:-1778.0, desc:'Cerium oxidizes to Ce₂O₃.', temp:'>300°C', realUse:'Catalysts, glass polishing' },
  { id:'nd2o3', reactants:['Nd','O'], eq:'Nd + O₂ → Nd₂O₃', balanced:'4Nd + 3O₂ → 2Nd₂O₃', products:['Neodymium Oxide (Nd₂O₃)'], type:'oxidation', visual:'color-change', color:'hsl(280,40%,50%)', enthalpy:-1808.0, desc:'Neodymium oxidizes to Nd₂O₃.', temp:'>300°C', realUse:'Magnets, lasers' },

  // NOBLE GAS REACTIONS (limited)
  { id:'xef2', reactants:['Xe','F'], eq:'Xe + F₂ → XeF₂', balanced:'Xe + F₂ → XeF₂', products:['Xenon Difluoride (XeF₂)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,90%)', enthalpy:-108.0, desc:'Xenon reacts with fluorine — noble gas compound!', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, oxidizers' },
  { id:'xef4', reactants:['Xe','F'], eq:'Xe + 2F₂ → XeF₄', balanced:'Xe + 2F₂ → XeF₄', products:['Xenon Tetrafluoride (XeF₄)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,85%)', enthalpy:-251.0, desc:'Xenon forms XeF₄ with excess fluorine.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, fluorinating agent' },
  { id:'xef6', reactants:['Xe','F'], eq:'Xe + 3F₂ → XeF₆', balanced:'Xe + 3F₂ → XeF₆', products:['Xenon Hexafluoride (XeF₆)'], type:'synthesis', visual:'spark', color:'hsl(0,0%,80%)', enthalpy:-294.0, desc:'Xenon forms XeF₆ — highest oxidation state noble gas compound.', safety:'⚠️ F₂ is toxic!', temp:'Room temp', realUse:'Research, superconductors' },

  // SUPERHEAVY ELEMENTS (theoretical)
  { id:'unununium', reactants:['Uuu','O'], eq:'Uuu + O₂ → UuuO₂', balanced:'Uuu + O₂ → UuuO₂', products:['Unununium Dioxide'], type:'oxidation', visual:'glow', color:'hsl(300,60%,50%)', enthalpy:-500.0, desc:'Theoretical oxidation of element 111.', temp:'High temp', realUse:'Research, nuclear physics' },

];

export const generateSMILES = (formula: string): string => {
  try {
    // Simple formula to SMILES conversion for basic molecules
    const simpleMolecules: Record<string, string> = {
      'H2O': 'O',
      'H2': '[H][H]',
      'O2': 'O=O',
      'N2': 'N#N',
      'CO2': 'O=C=O',
      'CH4': 'C',
      'NH3': 'N',
      'HCl': 'Cl',
      'NaCl': '[Na+].[Cl-]',
      'Fe2O3': '[Fe+3].[Fe+3].[O-2].[O-2].[O-2]',
      'Al2O3': '[Al+3].[Al+3].[O-2].[O-2].[O-2]',
      'SiO2': 'O=[Si]=O',
      'ZnO': '[Zn+2].[O-2]',
      'BaSO4': '[Ba+2].[O-]S(=O)(=O)[O-]',
      'PbO': '[Pb+2].[O-2]',
      'HgO': '[Hg+2].[O-2]',
      'SnO2': '[Sn+4].[O-2].[O-2]',
      'TiO2': '[Ti+4].[O-2].[O-2]',
      'Cr2O3': '[Cr+3].[Cr+3].[O-2].[O-2].[O-2]',
      'MnO2': '[Mn+4].[O-2].[O-2]',
      'FeO': '[Fe+2].[O-2]',
      'CuO': '[Cu+2].[O-2]',
      'AgCl': '[Ag+].[Cl-]',
      'CaO': '[Ca+2].[O-2]',
      'MgO': '[Mg+2].[O-2]',
      'Na2O': '[Na+].[Na+].[O-2]',
      'K2O': '[K+].[K+].[O-2]',
      'Li2O': '[Li+].[Li+].[O-2]',
      'BeO': '[Be+2].[O-2]',
      'B2O3': 'O=BOB=O',
      'CO': '[C-]#[O+]',
      'NO': 'N=O',
      'SO2': 'O=S=O',
      'SO3': 'O=S(=O)=O',
      'H2S': 'S',
      'P4': 'P12=P23P45=P56P78=P89P%10%11=P%12%13P%14%15=P%16%17',
      'P4O10': 'O=P12(OP3)(OP4)OP5.O=P67(OP8)(OP9)OP%10.O=P%11%12(OP%13)(OP%14)OP%15.O=P%16%17(OP%18)(OP%19)OP%20',
      'C6H12O6': 'OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O',
      'C12H22O11': 'OC[C@H]1O[C@@H](OC2[C@H](O)[C@@H](O)[C@H](O)O2)[C@H](O)[C@@H](O)[C@@H]1O',
      'C2H4': 'C=C',
      'C2H6': 'CC',
      'C3H8': 'CCC',
      'C4H10': 'CCCC',
      'C6H6': 'c1ccccc1',
      'C2H5OH': 'CCO',
      'CH3COOH': 'CC(=O)O',
      'NH4Cl': '[NH4+].[Cl-]',
      'CaCl2': '[Ca+2].[Cl-].[Cl-]',
      'MgCl2': '[Mg+2].[Cl-].[Cl-]',
      'AlCl3': '[Al+3].[Cl-].[Cl-].[Cl-]',
      'FeCl3': '[Fe+3].[Cl-].[Cl-].[Cl-]',
      'CuCl2': '[Cu+2].[Cl-].[Cl-]',
      'ZnCl2': '[Zn+2].[Cl-].[Cl-]',
      'AgNO3': '[Ag+].[O-][N+](=O)[O-]',
      'Na2CO3': '[Na+].[Na+].[O-]C([O-])=O',
      'CaCO3': '[Ca+2].[O-]C([O-])=O',
      'MgCO3': '[Mg+2].[O-]C([O-])=O',
      'BaCO3': '[Ba+2].[O-]C([O-])=O',
      'NaHCO3': '[Na+].OC([O-])=O',
      'KHCO3': '[K+].OC([O-])=O',
      'CaSO4': '[Ca+2].[O-]S(=O)(=O)[O-]',
      'MgSO4': '[Mg+2].[O-]S(=O)(=O)[O-]',
      'CuSO4': '[Cu+2].[O-]S(=O)(=O)[O-]',
      'ZnSO4': '[Zn+2].[O-]S(=O)(=O)[O-]',
      'FeSO4': '[Fe+2].[O-]S(=O)(=O)[O-]',
      'Al2(SO4)3': '[Al+3].[Al+3].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-].[O-]S(=O)(=O)[O-]',
      'Na3PO4': '[Na+].[Na+].[Na+].[O-]P([O-])([O-])=O',
      'Ca3(PO4)2': '[Ca+2].[Ca+2].[Ca+2].[O-]P([O-])([O-])=O.[O-]P([O-])([O-])=O',
      'H3PO4': 'OP(O)(O)=O',
      'H2SO4': 'OS(=O)(=O)O',
      'HNO3': 'O[N+](=O)[O-]',
      'HClO4': 'OCl(=O)(=O)=O',
      'HCN': 'C#N',
      'H2O2': 'OO',
      'NaOCl': '[Na+].[O-]Cl',
      'KMnO4': '[K+].[O-][Mn](=O)(=O)=O',
      'K2Cr2O7': '[K+].[K+].[O-][Cr](=O)(=O)O[Cr](=O)(=O)[O-]',
      'Na2S2O3': '[Na+].[Na+].[O-]S(=O)SS(=O)[O-]',
      'Cu(OH)2': '[Cu+2].[OH-].[OH-]',
      'Fe(OH)3': '[Fe+3].[OH-].[OH-].[OH-]',
      'Al(OH)3': '[Al+3].[OH-].[OH-].[OH-]',
      'Ca(OH)2': '[Ca+2].[OH-].[OH-]',
      'Mg(OH)2': '[Mg+2].[OH-].[OH-]',
      'NaOH': '[OH-].[Na+]',
      'KOH': '[OH-].[K+]',
      'LiOH': '[OH-].[Li+]',
      'Ba(OH)2': '[Ba+2].[OH-].[OH-]',
      'Sr(OH)2': '[Sr+2].[OH-].[OH-]',
      'Be(OH)2': '[Be+2].[OH-].[OH-]',
      'Zn(OH)2': '[Zn+2].[OH-].[OH-]',
      'Pb(OH)2': '[Pb+2].[OH-].[OH-]',
      'Hg(OH)2': '[Hg+2].[OH-].[OH-]',
      'AgOH': '[Ag+].[OH-]',
      'CuOH': '[Cu+].[OH-]',
      'FeOH': '[Fe+].[OH-]',
      'Ni(OH)2': '[Ni+2].[OH-].[OH-]',
      'Co(OH)2': '[Co+2].[OH-].[OH-]',
      'Mn(OH)2': '[Mn+2].[OH-].[OH-]',
      'Cr(OH)3': '[Cr+3].[OH-].[OH-].[OH-]',
      'Sn(OH)2': '[Sn+2].[OH-].[OH-]',
      'Sb(OH)3': '[Sb+3].[OH-].[OH-].[OH-]',
      'Bi(OH)3': '[Bi+3].[OH-].[OH-].[OH-]',
      'Ti(OH)4': '[Ti+4].[OH-].[OH-].[OH-].[OH-]',
      'Zr(OH)4': '[Zr+4].[OH-].[OH-].[OH-].[OH-]',
      'Hf(OH)4': '[Hf+4].[OH-].[OH-].[OH-].[OH-]',
      'V(OH)4': '[V+4].[OH-].[OH-].[OH-].[OH-]',
      'Nb(OH)5': '[Nb+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ta(OH)5': '[Ta+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Mo(OH)6': '[Mo+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'W(OH)6': '[W+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'U(OH)6': '[U+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Np(OH)4': '[Np+4].[OH-].[OH-].[OH-].[OH-]',
      'Pu(OH)4': '[Pu+4].[OH-].[OH-].[OH-].[OH-]',
      'Am(OH)3': '[Am+3].[OH-].[OH-].[OH-]',
      'Cm(OH)3': '[Cm+3].[OH-].[OH-].[OH-]',
      'Bk(OH)3': '[Bk+3].[OH-].[OH-].[OH-]',
      'Cf(OH)3': '[Cf+3].[OH-].[OH-].[OH-]',
      'Es(OH)3': '[Es+3].[OH-].[OH-].[OH-]',
      'Fm(OH)3': '[Fm+3].[OH-].[OH-].[OH-]',
      'Md(OH)3': '[Md+3].[OH-].[OH-].[OH-]',
      'No(OH)3': '[No+3].[OH-].[OH-].[OH-]',
      'Lr(OH)3': '[Lr+3].[OH-].[OH-].[OH-]',
      'Rf(OH)4': '[Rf+4].[OH-].[OH-].[OH-].[OH-]',
      'Db(OH)5': '[Db+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Sg(OH)6': '[Sg+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Bh(OH)7': '[Bh+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Hs(OH)8': '[Hs+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Mt(OH)9': '[Mt+9].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ds(OH)10': '[Ds+10].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Rg(OH)11': '[Rg+11].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Cn(OH)2': '[Cn+2].[OH-].[OH-]',
      'Nh(OH)3': '[Nh+3].[OH-].[OH-].[OH-]',
      'Fl(OH)4': '[Fl+4].[OH-].[OH-].[OH-].[OH-]',
      'Mc(OH)5': '[Mc+5].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Lv(OH)6': '[Lv+6].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Ts(OH)7': '[Ts+7].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
      'Og(OH)8': '[Og+8].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-].[OH-]',
    };
    
    return simpleMolecules[formula] || '';
  } catch (error) {
    console.warn(`Failed to generate SMILES for ${formula}:`, error);
    return '';
  }
};

export const findReaction = (symbols: string[]): Reaction | null => {
  if (symbols.length < 2) return null;
  const sorted = [...symbols].sort();

  // First try exact match with compound formulas
  const exactMatch = reactions.find(r => {
    const rs = [...r.reactants].sort();
    return rs.length === sorted.length && rs.every((s, i) => s === sorted[i]);
  });
  if (exactMatch) return exactMatch;

  // If no exact match, try to find reactions where the compounds can be formed from the elements
  // For example, if user selects H and O, find reactions that use H2O
  // This is a fallback for when users select elements that form common compounds

  // Check for water formation (H + O → H2O)
  if (sorted.includes('H') && sorted.includes('O') && sorted.length === 2) {
    return reactions.find(r => r.reactants.includes('H2O')) || null;
  }

  // Check for salt formation (Na + Cl → NaCl)
  if (sorted.includes('Na') && sorted.includes('Cl') && sorted.length === 2) {
    return reactions.find(r => r.reactants.includes('NaCl')) || null;
  }

  // Check for acid-base reactions (HCl + NaOH → NaCl + H2O)
  if ((sorted.includes('HCl') && sorted.includes('NaOH')) ||
      (sorted.includes('HCl') && sorted.includes('KOH')) ||
      (sorted.includes('H2SO4') && sorted.includes('Ca(OH)2'))) {
    return reactions.find(r => r.reactants.includes('HCl') && r.reactants.includes('NaOH')) || null;
  }

  // Check for metal + acid reactions
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const metalAcids = ['HCl', 'H2SO4', 'HNO3', 'CH3COOH'];
    const metals = ['Na', 'K', 'Ca', 'Mg', 'Zn', 'Fe', 'Al', 'Cu'];

    if (metals.includes(first) && metalAcids.includes(second)) {
      return reactions.find(r => r.reactants.includes(first) && r.reactants.includes(second)) || null;
    }
    if (metals.includes(second) && metalAcids.includes(first)) {
      return reactions.find(r => r.reactants.includes(second) && r.reactants.includes(first)) || null;
    }
  }

  // Check for carbonate + acid reactions
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const carbonates = ['CaCO3', 'Na2CO3', 'MgCO3'];
    const acids = ['HCl', 'H2SO4', 'HNO3'];

    if (carbonates.includes(first) && acids.includes(second)) {
      return reactions.find(r => r.reactants.includes(first) && r.reactants.includes(second)) || null;
    }
    if (carbonates.includes(second) && acids.includes(first)) {
      return reactions.find(r => r.reactants.includes(second) && r.reactants.includes(first)) || null;
    }
  }

  // Check for precipitation reactions
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const solubleSalts = ['NaCl', 'KNO3', 'AgNO3', 'Pb(NO3)2', 'BaCl2', 'Na2SO4'];

    if (solubleSalts.includes(first) && solubleSalts.includes(second)) {
      return reactions.find(r => r.reactants.includes(first) && r.reactants.includes(second)) || null;
    }
  }

  // Check for redox reactions
  if (sorted.length === 2) {
    const [first, second] = sorted;
    const oxidizers = ['KMnO4', 'H2O2', 'HNO3', 'CuSO4'];
    const reducers = ['FeSO4', 'Zn', 'Cu', 'H2O2'];

    if (oxidizers.includes(first) && reducers.includes(second)) {
      return reactions.find(r => r.reactants.includes(first) && r.reactants.includes(second)) || null;
    }
    if (oxidizers.includes(second) && reducers.includes(first)) {
      return reactions.find(r => r.reactants.includes(second) && r.reactants.includes(first)) || null;
    }
  }

  return null;
};

export const getReactionsForElement = (sym: string): Reaction[] =>
  reactions.filter(r => r.reactants.includes(sym));
