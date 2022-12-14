import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "../constants";
import { PropertiesChangedEvent } from "../interfaces/events/PartPropertiesChanged";
import { MaterialSelectedEvent } from "../interfaces/events/PartSelected";

// EVENTS
export const startSVGLoad = createAction<{
  product: string;
  model: string;
}>(`[${MODULE_NAME}] SVG Load Started`);
export const SVGLoaded = createAction<{
  graphId: string;
  svgRoot: SVGElement;
}>(`[${MODULE_NAME}] SVG Loaded`);

export const garmentParseFinished = createAction<{
  graphId: string;
  svgRoot: SVGElement;
}>(`[${MODULE_NAME}] Garment Parse Finished`);

// UI EVENTS
export const materialSelectedEvent = createAction<MaterialSelectedEvent>(
  `[${MODULE_NAME}] Material selected`
);
export const materialUnSelectedEvent = createAction(
  `[${MODULE_NAME}] Material unselected`
);
export const materialPropertiesChanged = createAction<PropertiesChangedEvent>(
  `[${MODULE_NAME}] Material properties changed`
);

// COMMANDS
export const parseSVG = createAction<{
  svgRoot: SVGElement;
}>(`[${MODULE_NAME}] Parse SVG`);
export const parseGarment = createAction<{
  graphId: string;
  svgRoot: SVGElement;
}>(`[${MODULE_NAME}] Parse Garment`);
export const parseMannequin = createAction<{
  graphId: string;
  svgRoot: SVGElement;
}>(`[${MODULE_NAME}] Parse Mannequin`);
export const parseAnnotations = createAction(
  `[${MODULE_NAME}] Parse Annotations`
);
