node-error
==========

a standard error library for node functions and http response

 ERR CODE:
 format:
 0x[31-24][23-16][15-8][7-0]

 [0-7]bit : Error Code,
 [8-15]bit: Property / Action Code
 Property turns to be Action when Entity is missing
 [16-23]bit: Entity Code
 [24-31]bit: Category Code
