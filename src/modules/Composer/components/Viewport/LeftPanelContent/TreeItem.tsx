import React from "react";
import useGraph from "@kernel/hooks/useGraph";
import styled from "styled-components";

import { CompositionGraphState, UIState } from "modules/Composer/store/state";
import { Composition } from "modules/Composer/interfaces/Composition";
import { Material } from "modules/Composer/interfaces/Material";
import { useAppDispatch } from "@kernel/store/hooks";
import { materialSelectedEvent } from "modules/Composer/store/actions";
import { useComposerUIState } from "modules/Composer/hooks/useComposerUIState";
import MaterialPreviewCircle from "../../Utils/MaterialPreviewCircle";

const StyledTreeItem = styled.li``;
const ItemDetails = styled.details`
  /* details[open] > summary {
    list-style-type: none;
  } */
`;
const Tree = styled.ul`
  list-style: none;
  padding-left: 1rem;
`;

const ItemLabel = styled.summary<{ isSelected: boolean }>`
  cursor: pointer;
  color: ${(p) => (p.isSelected ? "purple" : "white")};
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface TreeItemProps {
  graphId: string;
  nodeId: string;
  children: React.ReactNode;
}

const TreeItem = ({ graphId, nodeId, children }: TreeItemProps) => {
  const dispatch = useAppDispatch();
  const { state: node } = useGraph<
    CompositionGraphState,
    Composition | Material
  >(graphId, (g) => g.nodes[nodeId]);
  const selectedMaterial = useComposerUIState(
    (ui: UIState) => ui.rightPanel.selectedMaterialId
  );

  const handleSelection = (e: React.MouseEvent) => {
    if (node) dispatch(materialSelectedEvent({ material: node }));
    e.stopPropagation();
  };

  if (!node) return null;
  return (
    <Tree key={`${graphId}-${nodeId}`}>
      <StyledTreeItem
        key={nodeId}
        onClick={node.properties.Tipo?.value ? handleSelection : undefined}
      >
        <ItemDetails>
          <>
            <ItemLabel isSelected={node.id === selectedMaterial}>
              <span>{node.properties.Nome?.value ?? node.id}</span>
              {node.properties.Cor && (
                <MaterialPreviewCircle
                  color={node.properties.Cor.value}
                  r={5}
                />
              )}
            </ItemLabel>
            {children}
          </>
          {/* {hasSubtree && (
          <StyledTreeItem key={nodeId}>
            {connection.outputs.map((edgeId: EdgeId) => {
              const children = filterChildren(edgeId) ?? [];

              return children.map(([id]) => buildTree(id));
            })}
          </TreeItem>
        )} */}
        </ItemDetails>
      </StyledTreeItem>
    </Tree>
  );
};

export const MemoizedTreeItem = React.memo(TreeItem);

export default MemoizedTreeItem;
