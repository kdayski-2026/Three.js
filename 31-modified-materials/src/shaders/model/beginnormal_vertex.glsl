#include <beginnormal_vertex>

float angle = (position.y + uSpinPower) * sin(uTime) * uStretchPower;
mat2 rotateMatrix = get2dRotateMatrix(angle);

objectNormal.xz = objectNormal.xz * rotateMatrix;