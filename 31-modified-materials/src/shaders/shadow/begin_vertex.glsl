#include <begin_vertex>

float angle = (position.y + uSpinPower) * sin(uTime) * uStretchPower;
mat2 rotateMatrix = get2dRotateMatrix(angle);

transformed.xz = transformed.xz * rotateMatrix;