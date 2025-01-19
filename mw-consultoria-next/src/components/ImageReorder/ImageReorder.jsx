import React from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

const ImageReorder = ({ images, onReorder, onDelete }) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item === active.id);
      const newIndex = images.findIndex((item) => item === over.id);
      const newOrder = arrayMove(images, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {images.map((image, index) => (
            <div key={image} style={{ position: "relative" }}>
              <SortableItem id={image} image={image} />
              <button
                onClick={() => onDelete(image)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ImageReorder;
