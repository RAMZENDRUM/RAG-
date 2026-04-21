# MA8353 ICT

Title: MA8353-ICT.pdf

URL Source: https://www.msajce-edu.in/academics/civil/ICTTools/MA8353-ICT.pdf

Published Time: Wed, 14 Dec 2022 10:53:59 GMT

Number of Pages: 294

Markdown Content:
MA8353 

# TRANSFORMS & 

# PARTIAL DIFFERENTIAL 

# EQUATIONS 

# By  Dr  S Subramaniyan 

# MSAJCE  1= p,  = q,  = r,  = s,  = t. 

+ p = 0 (2) 

UNIT – I

PARTIAL  DIFFERENTIAL  EQUATIONS 

This  unit  covers  topics  that  explain  the  formation  of  partial  differential  equations 

and  the  solutions  of  special  types  of  partial  differential  equations. 

1.1  INTRODUCTION 

A partial  differential  equation  is  one  which  involves  one  or  more  partial 

derivatives.  The  order  of the  highest  derivative  is  called  the  order  of  the equation.  A

partial  differential  equation  contains  more  than  one  independent  variable.  But,  here  we 

shall  consider  partial  differential  equations  involving  one  dependent  variable  „z‟  and  only 

two  independent  variables  x and  y so  that  z = f(x,y).  We  shall  denote 

z z 2z 2z 2z

x y x2 xy y2

A partial  differential  equation  is  linear  if  it  is  of  the  first  degree  in  the  dependent 

variable  and  its  partial  derivatives.  If  each  term  of  such  an  equation  contains  either  the 

dependent  variable  or  one  of  its derivatives,  the equation  is  said  to  be  homogeneous, 

otherwise  it  is  non  homogeneous. 

1.2  Formation  of  Partial  Differential  Equations 

Partial  differential  equations  can  be  obtained  by  the  elimination  of  arbitrary  constants  or 

by  the  elimination of  arbitrary  functions. 

By  the  elimination  of  arbitrary  constants 

Let  us consider  the  function 

 ( x,  y, z, a, b  ) = 0 -------------(1) 

where  a & b are  arbitrary  constants 

Differentiating  equation  (1)  partially  w.r.t  x & y, we  get 

∂ ∂

∂x 

∂

∂z 

∂

+ q = 0 (3) 

∂y  ∂z 

Eliminating  a and  b from  equations  (1),  (2)  and  (3),  we get  a partial  differential 

equation  of  the first  order  of  the  form  f (x,y,z,  p, q)  = 0

# MSAJCE  2Example  1

Eliminate  the  arbitrary  constants  a & b from  z = ax  + by  + ab 

Consider  z = ax  + by  + ab  (1) 

Differentiating  (1)  partially  w.r.t  x & y,  we  get 

∂z 

= a i.e,  p=  a (2) 

∂x 

∂z 

= b i.e,  q = b (3) 

∂y 

Using  (2)  & (3)  in  (1),  we  get 

z = px  +qy+  pq 

which  is  the  required  partial  differential  equation. 

Example  2

Form  the  partial  differential  equation  by  eliminating  the  arbitrary  constants  a and  b

from 

z = ( x2 +a 2 ) ( y 2 + b2)

Given  z = ( x2 +a 2 ) ( y2 + b2) (1) 

Differentiating  (1)  partially  w.r.t  x & y , we  get 

p = 2x  (y 2 + b2 )

q = 2y  (x  + a )

Substituting  the  values  of  p and  q in  (1),  we  get 

4xyz  = pq 

which  is  the  required  partial  differential  equation. 

# MSAJCE  3From  these  equations  we  obtain 

x-a = -zp  (2) 

y -b =  -zq  (3) 

Using  (2)  and  (3)  in  (1),  we  get 

z2p2 + z2q2 + z2 = 1

or  z2 ( p2 + q2 + 1)  = 1

Example  3

Find  the  partial  differential  equation  of  the  family  of  spheres  of  radius  one  whose  centre 

lie  in the  xy  - plane. 

The  equation  of  the  sphere  is  given  by 

z2

( x – a )2 + ( y- b)  2 + = 1 (1) 

Differentiating  (1)  partially  w.r.t  x & y , we  get 

2 (x -a ) + 2 zp  =

2 (  y-b )  + 2 zq  =

0

0

Example  4

Eliminate  the arbitrary  constants a,  b &  c from 

x2 y2 z2

+ + = 1 and  form the  partial differential  equation. 

a2 b2 c2

The  given  equation  is 

x2 y2 z2

+ + = 1

a2 b2 c2

(1) 

# MSAJCE  4Differentiating  (1)  partially  w.r.t  x & y,  we  get 

2x  2zp 

+ = 0

a2 c2

2y  2zq 

+ = 0

b2 c2

Therefore  we  get 

x zp 

+ = 0 (2) 

a2

y

c2

zq 

+ = 0 (3) 

b2 c2

Again  differentiating  (2)  partially  w.r.t  „x‟,  we  set 

(1/a 2 ) +  (1/ c 2 ) (  zr +  p2 ) = 0 (4) 

Multiplying  ( 4)  by  x,  we  get 

x xz  r p2x

+ + = 0

a2 c2 c2

From  (2)  , we  have 

zp  xzr  p2x

+ +

c2 c2 c2 = 0

or  -zp  + xzr  + p2x = 0

By  the  elimination  of  arbitrary  functions 

Let  u and  v be  any  two  functions  of x,  y, z  and  Φ(u, v )  = 0, where Φ  is  an 

arbitrary  function.  This  relation  can  be expressed  as 

u = f(v)  (1) 

# MSAJCE  5Differentiating  (1) partially  w.r.t x & y and  eliminating  the  arbitrary 

functions  from  these  relations,  we  get  a partial  differential  equation  of  the  first  order 

of  the  form 

f(x,  y,  z,  p,  q ) = 0.

Example  5

Obtain  the  partial  differential  equation  by  eliminating  „f  „ from  z = ( x+y  ) f ( x2 - y2 )

Let  us  now  consider  the  equation 

z = (x+y  ) f(x 2- y2) (1) 

Differentiating  (1)  partially  w.r.t x  & y , we  get 

p = ( x + y  ) f '  ( x2 - y2 ) .  2x  + f ( x2 - y2 )

q = ( x + y ) f ' ( x2 - y2 ) . (-2y)  + f (  x2 - y2 )

These  equations  can  be  written  as 

p - f ( x2 - y2 ) = ( x + y ) f '(  x2 - y2 ) . 2x  (2) 

q - f (  x2 - y2 ) = ( x + y ) f  '(  x2 - y2 ) .( -2y)  (3) 

Hence,  we  get 

p - f ( x2 - y2 ) x

= -

q - f ( x2 - y2 ) y

i.e,  py  - yf(  x2 - y2 ) = -qx  +xf  ( x2 - y2 )

py  +qx  = ( x+y  ) f ( x2 - y2 )i.e, 

Therefore,  we  have  by(1),  py  +qx  = z

Example  6

Form  the  partial  differential  equation  by  eliminating  the  arbitrary  function  f

from 

z =  ey f (x  + y) 

Consider  z = ey f ( x +y  ) ( 1) 

Differentiating  (1)  partially  w .r.  t x & y,  we  get 

p = ey f ' (x  + y) 

q = ey f '(x  + y)  + f(x  + y).  ey

Hence,  we  have 

q =  p +  z

# MSAJCE  6Example  7

Form  the  PDE  by  eliminating  f & Φ from  z = f (x  +ay  ) + Φ (  x – ay) 

Consider  z =  f (x +ay )  + Φ (  x – ay)  (1) 

Differentiating  (1)  partially  w.r.t  x &y  , we  get 

p = f '(x  +ay  ) + Φ'  (x  – ay)  (2) 

q =  f ' (x +ay  ) .a + Φ' (x  – ay) (  -a)  (3) 

Differentiating  (2)  & (3)  again  partially  w.r.t  x &  y,  we  get 

r = f "( x+ay)  + Φ "(  x – ay) 

t = f "( x+ay) .a 2 + Φ"(  x – ay)  (-a) 2

i.e,  t = a2 { f"( x +  ay)  + Φ"(  x – ay)} 

or  t = a2r

Exercises: 

1. 

„b‟ 

Form  the  partial  differential  equation  by  eliminating  the  arbitrary  constants  „a‟  &

from  the following  equations. 

(i)  z = ax  + by 

(ii)  x2 + y2 z2

+ = 1

a2 b2

(iii) 

(iv) 

(v) 

z = ax  + by  + a2 + b2

ax 2 + by 2 + cz 2 = 1

z = a2x + b2y + ab 

3.  Find  the  PDE  of  all  spheres  whose  centre  lie  on  the  (i)  z axis  (ii)  x-axis 

4.  Form  the  partial  differential  equations  by  eliminating  the  arbitrary  functions  in  the 

following  cases. 

(i) 

(ii) 

(iii) 

(iv) 

z =  f (x  + y) 

z = f (x 2 – y2)

z =  f (x 2 + y 2 + z2)

 (xyz, x  + y + z) =  0

2.  Find  the  PDE  of  the  family  of  spheres  of  radius  1 having  their  centres  lie  on  the 

xy plane{Hint: (x  – a) 2 + (y  – b) 2 + z2 = 1} 

# MSAJCE  7(v)  z = x +  y + f(xy) 

(vi)  z = xy  + f  (x 2 + y2)

(vii)  z = f xy 

z

(viii)  F (xy  + z2, x + y + z)  = 0

(ix)  z = f (x  + iy)  +f  (x  – iy) 

(x)  z = f(x 3 + 2y)  +g(x 3 – 2y) 

1.3  SOLUTIONS  OF  A PARTIAL  DIFFERENTIAL  EQUATION 

A solution  or  integral  of a  partial  differential  equation  is  a relation  connecting  the 

dependent  and  the  independent  variables  which  satisfies  the  given  differential  equation.  A

partial  differential  equation  can  result  both  from elimination  of  arbitrary  constants  and 

from  elimination  of  arbitrary  functions  as  explained  in  section  1.2.  But,  there  is  a basic 

difference  in  the  two  forms  of  solutions.  A solution  containing  as  many  arbitrary 

constants  as  there  are  independent  variables  is  called  a complete  integral.  Here,  the  partial 

differential  equations  contain  only  two  independent  variables  so  that  the  complete 

integral  will  include  two  constants.A  solution  obtained  by  giving  particular  values  to  the 

arbitrary  constants  in  a complete  integral  is  called a  particular  integral. 

Singular  Integral 

Let  f (x,y,z,p,q)  = 0 ---------- (1) 

be  the  partial  differential  equation  whose  complete  integral  is 

 (x,y,z,a,b) =  0 ----------- (2) 

where  „a‟  and  „b‟  are arbitrary  constants. 

Differentiating  (2)  partially  w.r.t.  a and  b,  we  obtain 

 

-------- = 0

a

 

----------- (3) 

and  --------- = 0

b

----------- (4) 

The  eliminant  of  „a‟  and  „b‟  from  the equations (2),  (3)  and  (4),  when  it exists,  is 

called  the  singular  integral  of  (1). 

# MSAJCE  8General  Integral 

In  the  complete  integral  (2),  put  b = F(a),  we  get 

 (x,y,z,a,  F(a)  ) = 0 ---------- (5) 

Differentiating  (2),  partially  w.r.t.a,  we  get 

   

------- + -------- F'(a)  = 0

a b

-------- (6) 

The  eliminant  of  „a‟  between  (5)  and  (6),  if  it exists,  is  called  the general  integral  of  (1). 

SOLUTION  OF  STANDARD  TYPES  OF  FIRST  ORDER  PARTIAL 

DIFFERENTIAL  EQUATIONS. 

The  first  order  partial  differential equation  can  be  written  as 

f(x,y,z,  p,q)  = 0, 

where  p = z/ x and  q = z / y.  In  this  section,  we  shall  solve  some  standard  forms 

of  equations  by  special  methods. 

Standard  I : f (p,q)  = 0.  i.e,  equations  containing  p and  q only. 

Suppose  that  z = ax +  by  +c  is  a solution  of  the  equation  f(p,q)  = 0, where  f (a,b) 

= 0. 

Solving  this  for  b,  we  get  b = F (a). 

Hence  the  complete  integral  is  z = ax +  F(a)  y +c  ------------ (1) 

Now,  the  singular  integral  is  obtained  by  eliminating  a &  c between 

z = ax  + y  F(a)  + c

0 = x + y  F'(a) 

0 =  1. 

The  last  equation  being  absurd, the  singular  integral  does  not  exist in  this  case. 

To  obtain  the  general  integral,  let  us  take c  =  (a). 

# MSAJCE  9Then,  z = ax +  F(a) y  +  (a) 

Differentiating  (2)  partially  w.r.t.  a,  we  get 

-------------- (2) 

0 = x + F'(a).  y + '(a)  --------------- (3) 

Eliminating  „a‟  between  (2)  and  (3),  we get the general  integral 

Example  8

Solve  pq =  2

The  given  equation is  of the form  f (p,q) =  0

The  solution  is  z = ax  + by  +c,  where  ab =  2. 

2

Differentiating  (1)  partially  w.r.t  „c‟,  we  get 

0 =  1, 

which  is  absurd.  Hence,  there  is  no  singular  integral. 

To  find  the  general  integral,  put c  =  (a)  in  (1), we  get 

2

Z = ax  + ------ y +  (a) 

a

Differentiating  partially  w.r.t  „a‟,  we  get 

2

0 = x  – ------ y +  (a) 

a2

Eliminating  „a‟  between  these  equations  gives  the  general  integral. 

Solving,  b =  ------.

a

The  complete  integral  is 

2

Z = ax  + ------ y + c

a

---------- (1) 

# MSAJCE  10 Example  9

Solve  pq +  p +q =  0

The  given  equation  is of the form  f (p,q) =  0. 

The  solution  is  z = ax  + by  +c,  where ab  + a +  b = 0. 

Solving,  we  get 

a

b =  – --------

1 +  a

a

Hence  the  complete Integral  is  z =  ax  – ------- y+c 

1 +  a

------ (1) 

Differentiating  (1)  partially  w.r.t.  „c‟,  we  get 

0 =  1. 

The  above equation  being  absurd,  there  is  no  singular  integral  for  the  given  partial 

differential  equation. 

To  find  the  general integral,  put  c =  (a)  in  (1), we  have 

a

z = ax  – ---------

1 +a 

y +  (a)  ------(2) 

Differentiating  (2)  partially  w.r.t  a,  we  get 

1

0 = x – -------- y +  (a) 

(1  + a) 2

1

----- (3) 

Eliminating  „a‟  between  (2)  and (3) gives  the general  integral. 

Example  10 

Solve  p2 + q2 = npq 

The  solution of  this equation  is  z =  ax  + by  + c,  where a 2 + b2 = nab. 

Solving,  we  get 

n + (n 2 – 4) 

b =  a

# MSAJCE  11 2

Hence  the  complete  integral  is 

n + n2 – 4

z =ax  +a  ------------------ y + c

2

-----------(1) 

Differentiating  (1)  partially  w.r.t  c, we  get  0 = 1, which  is  absurd.  Therefore,  there  is  no 

singular  integral  for  the given  equation. 

To  find  the  general  Integral,  put C  =  (a),  we  get 

n +  n2 – 4

a ------------------- y +  (a) 

2

z =  ax  +

Differentiating  partially  w.r.t  „a‟,  we  have 

n + n2 – 4

0 = x + ------------------- y +   (a) 

2

The  eliminant  of  „a‟  between  these equations  gives  the  general  integral 

Standard  II  : Equations  of  the  form  f (x,p,q)  = 0,  f (y,p,q)  = 0 and  f (z,p,q)  = 0. 

i.e,  one  of  the  variables  x,y,z  occurs  explicitly. 

(i)  Let  us consider  the equation  f (x,p,q)  = 0. 

Since  z is  a function  of  x and  y, we  have 

z z

dz  = ------- dx  + -------- dy 

x y

dz  = pdx  + qdy or 

Assume  that  q = a. 

Then  the given  equation takes  the form  f (x,  p,a  ) = 0

Solving,  we  get  p =  (x,a). 

Therefore,  dz  = (x,a) dx  + a dy. 

Integrating,  z =   (x,a)  dx  + ay  + b which  is a  complete  Integral. 

# MSAJCE  12 (ii)  Let  us  consider  the  equation  f(y,p,q)  = 0. 

Assume  that  p = a. 

Then  the  equation  becomes f  (y,a,  q)  = 0

Solving,  we  get  q =  (y,a). 

Therefore,  dz =  adx  + (y,a)  dy. 

Integrating,  z = ax +   (y,a)  dy  + b,  which  is  a complete  Integral. 

(iii)  Let  us consider  the equation  f(z,  p,  q)  = 0. 

Assume  that  q = ap. 

Then  the  equation  becomes  f (z,  p,  ap)  = 0

Solving,  we get p  = (z,a). Hence  dz  = (z,a)  dx  + a (z,  a)  dy. 

dz 

ie,  ----------- = dx  + ady. 

 (z,a) 

dz 

Integrating,   ----------- = x +  ay  + b,  which  is  a complete  Integral. 

 (z,a) 

Example  11 

Solve q =  xp +  p2

Given  q = xp + p 2 -------------(1) 

This  is  of  the  form f  (x,p,q)  = 0. 

Put  q = a in  (1),  we  get 

a = xp +  p2

i.e, p 2 + xp  – a = 0. 

-x +(x 2 + 4a) 

p =  --------------------

2

Therefore, 

# MSAJCE  13 x2

z = – ------ ±

4

x x

------ (4a  + x2)+  a sin  h–1 -----

4 2a

Thus,  + ay  + b

Example  12 

Solve  q =  yp 2

This  is  of  the  form  f (y,p,q)  = 0

Then,  put p  = a. 

Therfore,  the given equation  becomes  q = a2y. 

Since  dz =  pdx +  qdy,  we  have 

dz  = adx  + a2y dy 

a2y2

Integrating,  we  get z  = ax  + ------- + b

2

Example  13 

Solve  9 (p 2z + q2) = 4

This  is  of  the  form  f (z,p,q)  = 0

Then,  putting  q = ap,  the  given  equation  becomes 

9 (p 2z + a2p2) = 4

2

p = ± ----------

3 (z + a2)

Therefore, 

2a 

q =  ± ----------

3 (z + a2)

and 

Since  dz  = pdx  + qdy, 

– x ± x2 + 4a 

z =  --------------------

2

Integrating  , dx  + ay  + b

# MSAJCE  14 2 2

dz  = ±

1

dx  ±

1

a dy 

3 z + a2

Multiplying  both  sides  by  z +  a2, we  get 

2 2

3 z + a2

z +  a2 dz  = ------ dx  + ------ a dy  , which on integration  gives, 

3 3

(z+a 2)3/2  2 2

= x + ay  + b. 

3/2  3 3

or  (z  + a2)3/2  = x + ay  + b. 

Standard  III  : f1(x,p)  = f2 (y,q).  ie,  equations  in  which  ‘z’  is  absent  and  the  variables 

are 

separable. 

Let  us  assume  as  a trivial  solution  that 

f(x,p)  = g(y,q)  = a (say). 

Solving  for  p and  q,  we  get  p = F(x,a)  and  q = G(y,a). 

z z

dz  = -------- dx  + ------- dy 

x y

But 

Hence  dz  = pdx  + qdy  = F(x,a)  dx  + G(y,a)  dy 

Therefore,  z = F(x,a)  dx  +  G(y,a)  dy  + b , which  is  the  complete  integral of  the  given 

equation  containing  two constants  a and  b. The  singular  and  general  integrals  are  found  in 

the  usual  way. 

Example  14 

Solve  pq =  xy 

The  given  equation  can  be  written  as 

p y

----- = ------ = a (say) 

x q

# MSAJCE  15 p

Therefore,  ----- = a

x

y

implies  p =  ax 

y

and  ------ = a implies  q = -----

q a

Since  dz  = pdx  + qdy,  we  have 

y

dz  = axdx  + ------ dy,  which on  integration  gives. 

a

ax 2 y2

z = + + b

2 2a 

Example  15 

Solve p 2 + q2 = x2 + y2

The  given  equation  can  be  written  as 

p2 – x2 = y 2 – q2 = a2 (say) 

p2 – x2 = a2 implies  p = (a 2 + x2)

and  y2 – q2 = a2 implies  q = (y 2 – a2)

But  dz  = pdx  + qdy 

ie,  dz  =  a2 + x2 dx  + y2 – a2 dy 

Integrating,  we  get 

x a2 a2

y yx

----- + ----y2 – a2 – ----- cosh -1 ----- + b

a 2 2 a

z = ----x2 + a 2+ ----- sinh –1

2 2

Standard  IV  (Clairaut’s  form) 

Equation  of  the  type  z = px  + qy  + f (p,q)  ------(1)  is  known  as  Clairaut‟s  form. 

# MSAJCE  16 Differentiating  (1)  partially  w.r.t  x and  y,  we  get 

p =  a and  q =  b. 

Therefore,  the  complete  integral  is  given  by 

z = ax  + by  + f (a,b). 

Example  16 

Solve z =  px  + qy  +pq 

The  given  equation  is  in  Clairaut‟s  form. 

Putting  p = a and  q = b,  we  have 

which  is  the  complete  integral. 

To  find  the  singular  integral, differentiating  (1)  partially  w.r.t a and  b,  we  get 

0 =  x + b

0 =  y + a

Therefore  we  have,  a = -y and  b=  -x. 

Substituting  the  values  of a  & b in  (1),  we  get 

z =  -xy  – xy  + xy 

or  z + xy  = 0,  which  is  the  singular  integral. 

To  get the  general integral, put  b =  (a) in  (1). 

Then  z = ax  + (a)y  + a (a)  ---------- (2) 

Differentiating  (2)  partially  w.r.t  a,  we  have 

0 = x + '(a)  y + a'(a)  + (a)  ---------- (3) 

Eliminating  „a‟  between  (2)  and (3),  we  get  the  general  integral. 

z = ax  + by  + ab  -------- (1) 

# MSAJCE  17 1

1 – x2 – y2 = -----------------

1 + a2 + b2

1

1 +a 2 + b2 = ----------------

1 – x2 – y2

i.e, 

Therefore, 

1

(1  +a 2 + b2) = ----------------

1 – x2 – y2

Using  (4)  in  (2) &  (3), we  get 

-----------(4) 

Example  17 

Find  the  complete and  singular  solutions  of  z =  px  + qy  +  1+  p2 + q2

The  complete  integral  is  given  by 

z = ax  + by  +  1+  a2 + b2 -------- (1) 

To  obtain  the singular  integral, differentiating  (1) partially  w.r.t  a & b.  Then, 

0 =  x +

a

1 + a2 + b2

b

0 = y +

1 + a2 + b2

Therefore, 

– a

x = (2) 

(1  + a2 + b2)

– b

and  y = ---------------

(1  + a2 + b2)

Squaring  (2)  & (3) and  adding,  we  get 

a2 + b2

x2 + y2 =

1 + a2 + b2

---------- (3) 

Now, 

# MSAJCE  18 x = – a 1 – x2 – y2

and  y = – b 1 – x2 – y2

-x -y

Hence,  a = -------------

1–x2–y2

and  b = ----------------

1–x2–y2

Substituting  the  values  of  a & b in  (1)  , we  get 

- x2 y2 1

z = – +

1–x2–y2

1–x2–y2 1–x2–y2

which  on  simplification  gives 

z = 1 – x2 – y2

or  x2 + y 2 + z2 = 1,  which  is  the  singular  integral. 

Exercises 

Solve  the  following  Equations 

1.  pq =  k

2.  p +  q =  pq 

3.  p +q =  x

4.  p =  y2q2

5.  z = p2 + q2

6.  p +  q =  x + y

7.  p2z2 + q2 = 1

8.  z = px  + qy  - 2pq 

9.  {z  – (px +  qy)} 2 = c2 + p2 + q2

10. z  = px  + qy  + p2q2

EQUATIONS  REDUCIBLE  TO  THE  STANDARD  FORMS 

Sometimes,  it  is  possible  to  have  non  – linear  partial  differential  equations of  the 

first  order  which  do  not belong  to  any  of  the  four  standard  forms  discussed  earlier.  By 

changing  the  variables  suitably,  we will  reduce  them  into any  one  of  the  four  standard 

forms. 

Type  (i)  : Equations  of the  form  F(x m p,  ynq)  = 0 (or)  F (z,  xmp,  ynq)  = 0. 

Case(i)  : If  m  1 and n   1,  then  put  x1-m = X and  y1-n = Y. 

# MSAJCE  19 z z

Now,  p = ----- = ------

x X

X z

. ------- = ------ (1 -m)  x -m

x X

z z

Therefore,  xmp = ------ (1 -m)  = (1  – m)  P,  where  P = -------

X X

z

Similarly, y nq = (1 -n)Q,  where  Q = ------

Y

Hence,  the  given  equation  takes  the  form  F(P,Q)  = 0 (or)  F(z,P,Q)  = 0. 

Case(ii)  : If  m = 1 and  n = 1,  then  put  log  x = X and  log  y = Y. 

Now,  p =

z z X z 1

= . =

x X x X x

z

Therefore,  xp =  ------ = P. 

X

Similarly,  yq  =Q. 

Example  18 

Solve  x4p2 + y2zq  = 2z 2

The  given  equation  can  be  expressed  as 

(x 2p) 2 + (y 2q)z  = 2z 2

Here  m = 2,  n = 2

Put  X = x1-m = x -1 and  Y = y 1-n = y -1.

We  have  xmp =  (1 -m) P  and  ynq = (1 -n)Q 

i.e,  x2p = -P and  y2q =  -Q. 

Hence  the  given  equation  becomes 

P2 – Qz =  2z 2 ----------(1) 

This  equation  is  of  the  form  f (z,P,Q)  = 0. 

Let  us  take  Q = aP. 

# MSAJCE  20 Then  equation  (1) reduces  to 

P2 – aPz  =2z 2

a  (a 2 + 8) 

P =  ----------------- z

2

Hence, 

a  (a 2 + 8) 

Q =  a ---------------- z

2

dz  = PdX  + QdY,  we  have 

and 

Since 

a  (a 2 + 8) 

dz  = ----------------

2

a  (a 2 + 8) 

z dX  + a --------------- z dY 

2

dz  a  (a 2 + 8) 

i.e,  ------ = ---------------- (dX  + a  dY) 

z 2

Integrating,  we  get 

a   a2 + 8

log  z =  ---------------- (X  + aY)  +b 

2

Therefore,  ---- + -----

a  (a 2 + 8)  1 a

log  z = ----------------

2

+ b which  is the  complete  solution. 

x y

Example  19 

Solve  x2p2 + y2q2 = z2

The  given  equation  can  be  written  as 

(xp) 2 + (yq) 2 = z2

Here  m = 1,  n = 1. 

Put  X =  log  x and  Y = log  y. 

# MSAJCE  21 Then  xp  = P and  yq  = Q. 

Hence  the  given  equation  becomes 

P2 + Q 2 = z2 -------------(1) 

This  equation  is  of  the  form  F(z,P,Q)  = 0. 

Therefore,  let  us  assume  that  Q = aP. 

Now,  equation  (1)  becomes, 

P2 + a2 P2 = z2

z

P =  --------

(1+a 2)

az 

Q =  --------

(1+a 2)

Hence 

and 

Since  dz  = PdX  + QdY,  we  have 

z az 

dz  = dX  + dY. 

(1+a 2) (1+a 2)

dz 

i.e,  (1+a 2) ------ = dX +  a dY. 

z

Integrating,  we  get 

(1+a 2) log  z = X + aY  + b. 

Therefore,  (1+a 2) log  z = logx  + alogy  + b,  which  is  the  complete  solution. 

Type  (ii)  : Equations  of  the  form  F(z kp,  zkq)  = 0 (or)  F(x,  zkp)  = G(y,z kq). 

Case  (i)  : If  k  -1,  put  Z = zk+1 ,

Z Z z z

Now  ------- = -------- ------- = (k+1)z k. ------- = (k+1)  zkp. 

x z x x

1 Z

Therefore,  zkp =  ----- -------

k+1  x

# MSAJCE  22 1 Z

Similarly,  zkq = ------- ------

k+1  y

Case  (ii)  : If  k =  -1,  put Z  = log  z. 

Now, 

Z Z z 1

= = p

x z x z

Z 1

Similarly,  ----- = ----- q. 

y z

Example  20 

Solve  z4q2 – z2p =  1

The  given  equation  can  also  be  written  as 

(z 2q) 2 – (z 2p)  =1 

Here  k =  2.  Putting  Z = z  k+1  = z3, we  get 

1 Z

Zkp = ------ ------

k+1  x

1 Z

and  Zkq = ------ ------

k+1  y

1 Z

i.e, Z 2p =  ------ ------

3 x

1 Z

and  Z2q = ------ ------

3 y

> 2

Q P

 = 1

3 3

i.e,  Q2 – 3P  – 9 = 0, 

which  is  of  the  form  F(P,Q)  = 0. 

Hence  its  solution  is  Z = ax  + by  + c,  where  b2 – 3a  – 9 = 0. 

Solving  for  b,  b =  ± (3a  +9) 

Hence  the  given  equation  reduces  to 

# MSAJCE  23 Hence  the  complete  solution  is 

Z = ax  + (3a  +9) .  y + c

or  z3 = ax  + (3a  +9)  y + c

Exercises 

Solve  the  following  equations. 

1.  x2p2 + y 2p2 = z2

2.  z2 (p 2+q 2) = x2 + y2

3.  z2 (p 2x2 + q2) = 1

4.  2x 4p2 – yzq  – 3z 2 = 0

5.  p2 + x2y2q2 = x2 z2

6. x2p + y2q = z2

7. x2/p  + y2/q  = z

8. z2 (p 2 – q2) = 1

9. z2 (p 2/x 2 + q2/y 2) = 1

10 . p2x + q2y = z.

1.4  Lagrange’s  Linear  Equation 

Equations of the  form Pp +  Qq  = R (1),  where  P,  Q and  R are 

functions  of  x,  y, z,  are known as  Lagrange‟s  equations and are  linear  in  „p‟  and  „q‟.To 

solve  this  equation,  let  us  consider  the  equations  u = a and v  = b,  where  a,  b are  arbitrary 

constants  and  u,  v are  functions  of  x,  y,  z. 

Since  „u  ‟ is a  constant,  we  have  du  = 0 -----------(2). 

But  „u‟  as  a function  of  x,  y,  z, 

∂u  ∂u  ∂u 

du  = dx  + dy  + dz 

∂x  ∂y  ∂z 

Comparing  (2)  and  (3), we  have 

∂u 

dx  +

∂x 

∂u  ∂u 

dy  + dz  = 0 (3) 

∂y  ∂z 

Similarly,  ∂v  ∂v  ∂v 

dx  + dy  + dz  = 0 (4) 

∂x  ∂y  ∂z 

# MSAJCE  24 Taking  the  first  two  ratios  , dx  dy 

x =

By  cross -multiplication,  we  have 

dx  dy  dz 

= =

∂u  ∂v  ∂u  ∂v  ∂u  ∂v  ∂u  ∂v  ∂u  ∂v  ∂u  ∂v 

- - -

∂z  ∂y  ∂y  ∂z  ∂x  ∂z  ∂z  ∂x  ∂y  ∂x  ∂x  ∂y 

(or) 

dx  dy  dz 

= = (5) 

P Q R

Equations  (5)  represent  a pair  of  simultaneous  equations  which  are  of  the  first 

order  and  of  first  degree.Therefore,  the  two  solutions  of  (5)  are  u = a  and  v = b.  Thus, 

( u,  v ) = 0 is  the  required  solution of  (1). 

Note  :

To  solve the  Lagrange‟s  equation,we  have  to form  the subsidiary  or  auxiliary 

equations 

dx  dy  dz 

= =

P Q R

which  can  be  solved  either  by  the  method  of  grouping  or  by  the  method  of 

multipliers. 

Example  21 

Find  the  general  solution  of  px  + qy  = z.

Here,  the  subsidiary  equations  are 

dx  dy  dz 

= =

x y z

y

Integrating,  log  x = log  y + log  c1

# MSAJCE  25 =

or  x = c1 y

i.e,  c1 = x / y

From  the  last  two  ratios,  dy 

y

dz 

z

Integrating,  log  y = log  z + log  c2

or  y = c2 z

i.e,  c2 = y / z

Hence  the  required  general  solution  is 

Φ(  x/y,  y/z)  = 0,  where  Φ is  arbitrary 

Example  22 

Solve  p tan x  + q tan y  = tan  z

The  subsidiary  equations  are 

dx  dy  dz 

= =

tanx  tany  tanz 

i.e,  c2 = siny  / sinz 

Hence  the  general  solution  is 

=

Taking  the  first  two  ratios  , dx  dy 

tanx  tany 

ie,  cotx  dx  = coty  dy 

Integrating,  log  sinx  = log  siny  + log  c1

ie,  sinx  = c1 siny 

Therefore,  c1 = sinx  / siny 

Similarly,  from  the  last  two  ratios,  we  get 

siny  = c2 sinz 

# MSAJCE  26 Integrating,  x + y + z = c1 (1) 

Again  using  multipliers  x, y  and  z, 

xdx + ydy  + zdz 

each  ratio  =

0

Therefore,  xdx +  ydy  + zdz  = 0. 

Integrating,  x2/2  + y2/2 +z 2/2  = constant 

or  x2 + y2 + z2 = c2 (2) 

Hence  from  (1)  and  (2),  the  general  solution  is 

Φ ( x +  y + z, x 2 + y 2 + z2) = 0

Example  24 

Find  the  general  solution of  (mz  - ny) p  + (nx - lz)q  = ly  - mx. 

Example  23 

Solve  (y -z)  p + (z -x) q  = x-y

Here  the  subsidiary  equations  are 

dx  dy  dz 

= =

y-z z- x x –y

Using  multipliers  1,1,1, 

dx  + dy  + dz 

each  ratio  =

0

Therefore,  dx  + dy  + dz  =0. 

sinx  siny 

Φ ,

siny  sinz 

= 0,  where  Φ is  arbitrary. 

# MSAJCE  27 Here  the  subsidiary  equations  are 

dx  dy  dz 

= =

mz - ny  nx  - lz  ly  - mx 

Using  the  multipliers  x,  y and  z,  we  get 

xdx  + ydy  + zdz 

each  fraction  =

0

`  xdx  + ydy  + zdz  = 0,  which  on  integration  gives 

x2/2  + y 2/2 +z 2/2  = constant 

or  x2 + y2 + z2 = c1 (1) 

Again  using  the  multipliers  l, m  and  n,  we  have 

ldx  + mdy  + ndz 

each  fraction  =

0

`  ldx  + mdy  + ndz  = 0, which  on  integration  gives 

lx  + my  + nz  = c2 (2) 

Hence,  the  required  general  solution  is 

Φ(x 2 + y2 + z2 , lx  + my  + nz  ) = 0

Example  25 

Solve  (x 2 - y2 - z2 ) p  + 2xy  q = 2xz. 

The  subsidiary  equations  are 

dx  dy  dz 

= =

x2-y2-z2 2xy  2xz 

Taking  the  last  two  ratios, 

dx  dz 

=

2xy  2xz 

# MSAJCE  28 2xy  2xz 

ie,  dy  dz 

=

y z

Integrating,  we  get  log  y = log  z + log  c1

or  y = c1z

i.e,  c1 = y/z  (1) 

Using  multipliers  x,  y and  z,  we  get 

xdx  + y dy  + zdz  xdx  + y dy  + zdz 

each  fraction  = =

x (x 2-y2-z2 )+2xy 2+2xz 2 x ( x2+ y2 + z2 )

Comparing  with  the  last  ratio,  we  get 

xdx  + y dy  + zdz  dz 

=

x ( x2+ y2 + z2 ) 2xz 

2xdx  + 2ydy  + 2zdz  dz 

i.e,  =

x2+ y2 + z2 z

Integrating,  log  ( x2+ y2 + z2 ) = log  z + log  c2

or  x2+ y2 + z2 = c2 z

x2+ y2 + z2

i.e,  c2 = (2) 

z

From  (1) and  (2),  the  general  solution  is  Φ(c 1 ,  c2) = 0. 

x2+ y2 + z2

i.e,  Φ (y/z)  , = 0

z

# MSAJCE  29 c0 ------ + c1 ----------- + . . . . . . +  cn -------- = F (x,y)  --------- (1) 

xn xn-1y yn

where  c0,  c1, ---------, cn are  constants  and  F is a  function of  „x‟  and  „y‟.  It  is 

homogeneous  because  all  its  terms  contain  derivatives  of  the  same  order. 

Equation  (1)  can  be  expressed  as 

Exercises 

Solve  the  following  equations 

1.  px 2 + qy 2 = z2

2.  pyz  + qzx  = xy 

3.  xp  – yq  = y2 – x2

4.  y2zp +  x2zq =  y2x

5.  z (x  – y) =  px 2 – qy 2

6.  (a  – x) p +  (b  – y) q  = c  – z

7.  (y 2z p) /x  + xzq =  y2

8.  (y 2 + z2) p – xyq +  xz  = 0

9.  x2p + y 2q = (x + y)  z

10.  p – q =  log  (x+y) 

11.  (xz + yz)p  + (xz  – yz)q  = x2 + y2

12.  (y  – z)p  – (2x  + y)q  = 2x  + z

1.5  PARTIAL  DIFFERENTIAL  EQUATIONS  OF  HIGHER  ORDER  WITH 

CONSTANT  COEFFICIENTS. 

Homogeneous  Linear  Equations  with  constant  Coefficients .

A homogeneous  linear  partial  differential  equation  of  the  nth  order  is  of  the  form 

nz nz nz

(c 0Dn + c1Dn-1 D' + ….. +  cn D'n  ) z =  F (x,y) 

f (D,D ') z = F (x,y)  ---------(2), or 

# MSAJCE  30  

where,  -----  D and  -----  D' .

x y

As  in  the  case  of  ordinary  linear  equations  with  constant  coefficients  the  complete 

solution  of  (1)  consists  of  two  parts,  namely,  the  complementary  function  and  the 

particular  integral. 

The  complementary  function is  the  complete  solution  of  f (D,D ') z = 0-------(3), 

which  must  contain  n arbitrary  functions  as  the  degree  of  the  polynomial  f(D,D ').  The 

particular  integral  is  the  particular  solution  of  equation  (2). 

Finding  the  complementary  function 

Let  us  now  consider  the  equation  f(D,D ') z = F (x,y) 

The  auxiliary  equation  of  (3)  is  obtained by  replacing  D by  m and  D' by  1. 

i.e,  c0 mn + c1 mn-1 + …..  + cn = 0 ---------(4) 

Solving  equation  (4) for  „m‟,  we get  „n‟  roots.  Depending  upon  the nature  of the  roots, 

the  Complementary  function  is  written  as  given  below: 

Roots  of  the  auxiliary 

equation 

Nature  of  the 

roots 

Complementary  function(C.F) 

m1,m 2,m 3 …….  ,m n distinct  roots  f1 (y+m 1x)+f 2(y+m 2x)  + …….+f n(y+m nx). 

m1 = m2 = m,  m3 ,m 4,….,m n two  equal  roots  f1(y+m 1x)+xf 2(y+m 1x)  + f 3(y+m 3x)  + ….+ 

fn(y+m nx). 

m1 = m2 = …….=  mn = m all  equal  roots  f1(y+mx)+xf 2(y+mx)  + x2f3(y+mx)+….. 

+ …+x n-1 fn (y+mx) 

Finding  the  particular  Integral 

Consider  the  equation  f(D,D ') z = F (x,y). 

1

Now,  the  P.I  is given  by  --------- F (x,y) 

f(D,D ')

Case  (i)  : When  F(x,y)  = eax  +by 

1

P.I  = ----------- eax+by 

f (D,D ')

Replacing  D by  „a‟  and  D' by  „b‟,  we  have 

1

P.I  = ----------- eax+by , where  f (a,b)  ≠ 0. 

# MSAJCE  31 f (a,b) 

Case  (ii)  : When  F(x,y) =  sin(ax +  by)  (or)  cos  (ax  +by) 

1

P.I  = ----------------- sin (ax+by)  or  cos  (ax+by) 

f(D 2,DD ',D '2 )

Replacing  D2 = -a2, DD ' 2 = -ab  and  D' = -b2, we  get 

1

P.I  = ----------------- sin (ax+by)  or  cos  (ax+by)  , where  f( -a2, - ab,  -b2) ≠  0. 

f( -a2, - ab,  -b2)

Case  (iii)  : When  F(x,y)  = xm yn,

1

P.I  = ---------- xm yn = [f (D,  D')] -1 xm yn

f(D,D ')

Expand  [f  (D,D ')] -1 in  ascending  powers  of  D or D ' and operate  on x m yn term  by  term. 

Case  (iv)  : When F(x,y)  is  any  function  of  x and  y. 

1

P.I  = ---------- F (x,y). 

f (D,D ')

1

Resolve ----------- into partial fractions considering  f (D,D ') as a function of  D alone. 

f (D,D ')

Then  operate  each  partial  fraction  on F(x,y)  in  such  a way  that 

1

--------- F (x,y)  =  F(x,c -mx) dx  ,

D–mD '

where  c is  replaced  by  y+mx after  integration 

Example  26 

Solve(D 3 – 3D 2D' + 4D '3 ) z = ex+2y 

The  auxillary  equation is m=m 3 – 3m 2 + 4 =  0

# MSAJCE  32 The  roots are  m =  -1,2,2 

Therefore  the  C.F  is  f1(y -x)  + f2 (y+  2x) +  xf 3 (y+2x). 

ex+2y 

P.I.=  ---------------------- (Replace  D by  1 and  D' by  2) 

D3–3D 2D'+4D '3 

ex+2y 

=

1-3 (1)(2)  + 4(2) 3

ex+2y 

=

27 

Hence,  the  solution  is  z = C.F.  + P.I 

ex+2y 

ie,  z = f1 (y -x)  + f2(y+2x)  + x f 3(y+2x)  + ----------

27 

Example  27 

Solve  (D 2 – 4DD ' +4  D' 2) z = cos  (x  – 2y) 

The  auxiliary  equation  is  m2 – 4m +  4 =  0

Solving,  we  get  m = 2,2. 

Therefore  the  C.F  is  f1(y+2x)  + xf 2(y+2x). 

1

 P.I  = cos  (x -2y) 

D2 – 4DD ' + 4D '2

Replacing  D2 by  – 1, DD ' by  2 and  D' 2  by  –4,  we  have 

1

P.I  = cos  (x -2y) 

(-1)  – 4 (2)  + 4( -4) 

cos  (x -2y) 

= –

25 

# MSAJCE  33 = (x 3y) 

 Solution  is  z =  f1(y+2x)  + xf 2(y+2x)  – --------------- .

25 

Example  28 

Solve  (D 2 – 2DD ') z = x3y + e5x

The  auxiliary  equation  is  m2 – 2m = 0.

Solving,  we  get  m = 0,2.

Hence  the  C.F is  f1 (y)  + f2 (y+ 2x) .

x3y

P.I1 =

D2 – 2DD '

1

2D '

D2 1– -------

D

1 2D ' –1

= ------- 1– ------- (x 3y) 

D2 D

> 2

1 2D ' 4D '

= ----- 1 +  ------- + ---------- + . . . .  . (x 3y) 

DD2 D2

1 2 4 2

= ------ (x 3y) +  ----- D' (x 3y)  + ------ D' (x 3y) +  . . . .  .

DD2 D2

1 2 4

= ------- (x 3y)  + ----- (x 3) + ------ (0)  + . . . . .

DD2 D2

1 2

P.I 1 = ------- (x 3y) +  ------ (x 3)

D2 D3

x5y x6

P.I 1 = ------- + ------

20  60 

# MSAJCE  34 e5x 

P.I 2 = -------------- (Replace  D by  5 and  D' by  0) 

D2 – 2DD '

e5x 

=

25 

x5y x6 e5x 

Solution  is  Z = f1(y)  + f2 (y+2x) +  ------- + ------ + ------

20  60  25 

Example  29 

> 2

Solve  (D 2 + DD ' – 6 D‟)  z =  y cosx. 

The  auxiliary  equation  is m 2 + m – 6 =  0. 

Therefore,  m =  –3,  2. 

Hence  the  C.F  is  f1(y -3x)  + f2(y  + 2x). 

y cosx 

P.I  = 2

D2 + DD ' – 6D '

y cosx 

=

=

(D  + 3D ') (D  – 2D ')

1 1

(D+3D ') (D  – 2D ')

y cosx 

 (c  – 2x)  d (sinx) 

= ------------- [(c  – 2x)  (sinx)  – (-2)  ( - cosx)] 

(D+3D ')

1

= ------------- [ y sin x  – 2 cos  x)] 

(D+3D ')

=  [(c  + 3x) sinx  – 2 cosx]  dx  , where  y = c +  3x 

1

= -------------

(D+3D ')

1

= -------------

(D+3D ')

1

 (c  – 2x)  cosx  dx,  where  y = c – 2x 

# MSAJCE  35 =

(D  – 2D ') (D  – 2D ')

1 1

(D  – 2D ') (D  – 2D ')

=  (c  + 3x)  d( – cosx)  – 2 cosx  dx 

= (c  + 3x)  (– cosx)  – (3)  ( - sinx)  – 2 sinx 

= – y cosx  + sinx 

Hence  the  complete  solution  is 

z = f1(y  – 3x)  + f2(y  + 2x)  – y cosx +  sinx 

Example  30 

Solve  r – 4s +  4t  = e 2x  +y 

2z 2z 2z

Given  equation  is  -------- – 4 ---------- + 4 ----------- = e2x  + y

x2 xy y2

i.e,  (D 2 – 4DD ' + 4D ' 2 ) z = e2x  + y

The  auxiliary  equation  is m 2 – 4m + 4 =  0. 

Therefore,  m =  2,2 

Hence  the  C.F  is  f1(y  + 2x)  + x f 2(y  + 2x). 

e2x+y 

P.I.  =

D2 – 4DD '+4D ' 2

Since  D2 – 4DD '+4D '2  = 0  for  D = 2 and  D' = 1,  we  have  to  apply  the general  rule. 

e2x+y 

P.I.  =

e2x+y 

1

= -------------  e2x+c  – 2x  dx  , where  y = c  – 2x. 

(D  – 2D ')

# MSAJCE  36 (D  – 2D ')

1

= ec .x 

(D  – 2D ')

1

= xe  y+2x 

D – 2D '

=  xe c-2x  + 2x  dx 

=  xe c dx 

= ec. x2/2 

x2ey+2x 

, where  y = c – 2x. 

=

2

Hence  the  complete  solution  is 

1

z = f1(y+2x)  + f2(y+2x)  + ----- x2e2x+y 

2

1.6  Non  – Homogeneous  Linear  Equations 

Let  us consider  the  partial  differential  equation 

f (D,D ') z = F (x,y)  ------- (1) 

If  f (D,D ') is  not  homogeneous,  then  (1)  is a  non –homogeneous  linear  partial  differential 

equation.  Here  also,  the  complete  solution  = C.F  + P.I. 

The  methods  for  finding  the  Particular  Integrals  are  the  same  as  those  for 

homogeneous  linear  equations. 

But  for  finding  the  C.F, we  have  to  factorize  f (D,D ') into  factors  of  the  form  D – mD ' – c. 

Consider  now  the  equation 

(D  – mD ' – c)  z =  0 -----------(2). 

1

=  ec dx 

# MSAJCE  37 This  equation  can  be  expressed  as 

p – mq = cz  ---------(3), 

which  is  in  Lagrangian  form. 

The  subsidiary  equations  are 

dx  dy  dz 

= = (4) 

1 – m cz 

The  solutions  of (4)  are  y + mx  = a and  z = be cx .

Taking  b = f (a),  we get  z =  ecx  f (y+mx)  as the  solution of  (2). 

Note: 

1.  If  (D -m1D' – C1) (D  – m2D'-C2) ……  (D  – mnD'-Cn) z  = 0 is the  partial 

differential equation,  then  its  complete  solution  is 

z = ec1x f1(y  +m 1x)  + ec2x f2(y+m 2x)  + . . . . . + ecnx fn(y+m nx) 

2.  In  the  case  of  repeated  factors, the  equation  (D -mD ' – C) nz =  0 has  a complete 

solution  z = ecx  f1(y  +mx)  + x e cx  f2(y+mx)  + . . . . . +x  n-1 ecx  fn(y+mx). 

Example  31 

Solve  (D -D'-1)  (D -D' – 2)z  = e 2x  – y

Here  m1 = 1,  m2 = 1,  c1 = 1,  c2 = 2. 

Therefore,  the  C.F  is  ex f1 (y+x)  + e2x  f2 (y+x). 

e2x -y

P.I.  = ------------------------------ Put  D =  2, D ' = – 1. 

(D  – D' – 1)  (D -D' – 2) 

e2x -y

=

(2  – ( – 1)  – 1)  (2  – ( – 1)  – 2) 

# MSAJCE  38 e2x -y

=

2

e 2x -y

----------.

2

Hence  the  solution  is  z = ex f1 (y+x)  + e2x  f2 (y+x)  +

Example  32 

Solve  (D 2 – DD ' + D' – 1)  z =  cos  (x +  2y) 

The  given  equation  can  be  rewritten  as 

(D -D'+1)  (D -1)  z = cos  (x  + 2y) 

Here  m1 = 1,  m2 = 0,  c1 = -1,  c2 = 1. 

Therefore,  the  C.F  = e–x f1(y+x)  + ex f2 (y) 

1

P.I  = --------------------------- cos  (x+2y) 

(D 2 – DD ' + D' – 1) 

> 2

[Put  D2 = – 1,DD ' = - 2 ,D ' = – 4] 

1

= cos  (x+2y) 

Example  33 

Solve  [(D  + D'– 1)  (D +  2D ' – 3)] z =  ex+2y  + 4 + 3x  +6y 

Here  m1 = – 1,  m2 = – 2 , c1 = 1, c 2 = 3. 

– 1 – (– 2)  + D' – 1

1

= ------- cos  (x+2y) 

D'

sin  (x+2y) 

=

2 sin(x+2y) 

Hence  the  solution  is  z = e-x f1(y+x)  ex f2(y)  + ---------------- .

2

# MSAJCE  39 Hence  the  C.F  is  z =  ex f1(y  – x)  + e3x  f2(y  – 2x). 

ex+2y 

P.I 1 = [Put  D = 1,  D'= 2] 

(D+D ' – 1) (D  + 2D ' – 3) 

ex+2y 

=

(1+2  – 1)  (1+4  – 3) 

ex+2y 

=

4

1

P.I 2 = (4  + 3x  + 6y) 

(D+D ' – 1) (D  + 2D ' – 3) 

1

= (4  + 3x  + 6y) 

D + 2D '

3 [1  – (D+D ')]  1 – ------------

3

1 D + 2D ' -1

= ------ [1  – (D  + D')] -1 1 – -------------- (4  +3x+6y) 

3 3

1 D + 2D ' 1

= ----[1  + (D  + D')+  (D+D ')2 + . . .]  1+  ------------- + ----- (D+2D ')2 + …..  .] 

3 3 9

. (4 +  3x  +6y) 

1 4 5

= ---- 1 +  ----- D +  ------D' + . . .  . .  (4 +  3x  + 6y) 

3 3 3

# MSAJCE  40 Hence  the  complete  solution  is 

ex+2y 

z = exf1 (y -x) + e 3x  f2 (y  – 2x) +  ------- + x + 2y  + 6. 

4

Exercises 

(a)  Solve  the  following  homogeneous Equations. 

2z 2z 2z

1.  ---------- + --------- – 6 --------- = cos (2x +  y) 

x2 xy y2

2z 2z

2.  ---------- – 2 --------- = sin x.cos  2y 

x2 xy

3.  (D 2 + 3DD ' + 2D '2 ) z = x +  y

4.  (D 2 – DD '+ 2D ' 2) z = xy  + ex. coshy 

ey + e–y ex+y  + e x-y

Hint:  ex. coshy  = ex. =

2 2

5.  (D 3 – 7DD ' 2 – 6D ' 3) z = sin  (x+2y)  + e2x+y 

6.  (D 2 + 4DD ' – 5D '2 ) z = 3e 2x -y + sin  (x  – 2y) 

7.  (D 2 – DD ' – 30D '2 ) z = xy  + e6x+y 

8.  (D 2 – 4D ' 2) z = cos2x.  cos3y 

9.  (D 2 – DD ' – 2D '2 ) z = (y  – 1)e x

1 4 5

= ---- 4 +3x  + 6y  + ----- (3) +  -----(6) 

3 3 3

= x + 2y  + 6

# MSAJCE  41 10.  4r  + 12s +  9t =  e3x  – 2y 

(b)  Solve  the  following  non  – homogeneous  equations. 

1.  (2DD ' + D' 2 – 3D ') z = 3 cos(3x  – 2y) 

2.  (D 2 + DD ' + D' – 1)  z =  e-x

3.  r – s +  p =  x2 + y2

4.  (D 2 – 2DD ' + D'2  – 3D  + 3D ' + 2)z  = (e 3x  + 2e -2y )2

5.  (D 2 – D'2  – 3D  + 3D ') z = xy  + 7. 

# MSAJCE  42 a0 

a Fourier  series  of  the  form  ------- +  (a n cosnx  + bn sinnx)  provided  the  following 

2 n=1 

conditions  are  satisfied. 

f (x)  is  periodic,  single – valued  and finite  in  [ c,  c + 2 ]. 

f (x)  has a  finite number of  discontinuities in  [ c,  c + 2]. 

f (x)  has  at the  most  a finite  number  of maxima  and  minima  in  [ c,c+  2]. 

These  conditions  are  known  as  Dirichlet  conditions.  When  these  conditions  are  satisfied, 

the  Fourier  series converges  to  f(x)  at  every  point  of  continuity.  At  a point  of 

discontinuity  x = c,  the  sum  of  the  series  is  given  by 

f(x)  = (1/2)  [ f (c -0)  + f (c+0)]  ,

## UNIT –II 

## FOURIER  SERIES 

2.1  INTRODUCTION 

The  concept  of  Fourier  series  was  first  introduced  by  Jacques  Fourier  (1768 –

1830 ),  French  Physicist  and  Mathematician . These  series  became  a most  important  tool 

in  Mathematical  physics  and  had  deep  influence  on  the  further  development  of 

mathematics  it  self .Fourier  series  are  series  of  cosines  and  sines  and  arise  in  representing 

general  periodic  functions  that  occurs  in  many  Science  and  Engineering  problems . Since 

the  periodic  functions  are  often  complicated,  it  is  necessary  to  express  these  in  terms  of 

the  simple  periodic  functions  of  sine  and  cosine . They  play  an  important  role  in  solving 

ordinary  and  partial  differential  equations .

2.2  PERIODIC  FUNCTIONS 

A function  f (x)  is  called  periodic  if  it is  defined  for  all  real  „x‟  and  if  there  is 

some  positive  number  „p‟  such  that 

f (x  + p ) = f (x)  for  all  x. 

This  number  „p‟  is called  a period of  f(x). 

If  a periodic  function  f (x)  has  a smallest  period  p (>0),  this  is  often  called  the 

fundamental  period  of  f(x).  For  example,  the  functions  cosx  and  sinx  have  fundamental 

period  2.

DIRICHLET  CONDITIONS 

Any  function  f(x),  defined  in  the  interval  c  x  c + 2, can  be  developed  as 

# MSAJCE  43 where  f (c -0)  is  the  limit  on  the  left  and  f (c+0)  is  the  limit  on  the  right. 

EULER’S  FORMULAE 

The  Fourier  series  for  the function f(x)  in  the  interval  c < x < c + 2 is  given  by 

a0 

f (x)  = ------- +  (a n cosnx  + bn sinnx),  where 

2 n=1 

1 C + 2

a0 = -----  f (x)  dx. 

> C



1 C + 2

an = -----  f(x) cosnx  dx. 

> C



1 C + 2

bn = -----  f (x)  sinnx  dx. 

 C

= 1

π

x2

2

- π

1 π2 π2

= - = 0

π 2 2

ao = 0

ao ∞

---- + ∑

2 n=1 

These  values  of  a0, an, bn are  known  as  Euler‟s  formulae.  The  coefficients  a0, an, bn are 

also  termed  as  Fourier  coefficients. 

Example  1

Expand  f(x) =  x as  Fourier  Series  (Fs)  in the  interval  [ -π,  π] 

Let  f(x)  = [ an cos  nx  + bn sin  nx  ] ----------(1) 

1 π

Here  ao = ∫ f (x)  dx 

π -π

1 π

= ∫ x dx 

π -π

π

# MSAJCE  44 1 π

an = --- ∫ f(x)  cosnx  dx 

π -π

1 π sin  nx 

∫ x d --------

π -π n

=

π

- (1)  -cos  nx 

π

= 1 (x)  sin  nx 

n n2 - π

= 1

π

cos  nπ  cos  nπ 

n2 n2

= 0

bn =

-cos  nx 

n

1 π

∫ f(x)  sin  nx  dx 

π -π

1 π

∫ x d

π -π

=

1 -cosnx  -sin  nx  π

= (x)  - (1) 

bn = 2 (-1) n+1 

n

[ cos nπ  = (-1) n]

Substituting  the  values  of  ao, an & bn in  equation  (1),  we  get 

> 

π n n2

- π

= 1

π

- πcos nπ  πcosnπ 

n n

= -2π  cosnπ 

nπ 

f(x)  =  2( -1) n+1  sin  nx 

n=1  n

x = 2 sinx  - 1 sin2x  + 1 sin  3x  -…… 

1 2 3

# MSAJCE  45 12 22 32 42 12 

2.  1 + 1 + 1 + 1 + …………  = 2

12 22 32 42 6

3.  1 + 1 + 1 + 1 + …………  = 2

12 32 52 72 8



Let  f(x)  = a0 +  [ an cosnx  + bn sinnx  ]

2 n=1 

Here  

a0 = 1  f(x)  dx 

 -



= 1 

 -

x2 dx 



+

x3

= 1

 3 -

= 1 3 3

 3 3

ao = 22

3



an = 1  f(x)  cosnx  dx 

 -



= 1  x2 cosnx  dx 

 -

Example  2

Expand  f(x)  = x2 as  a Fourier  Series  in the  interval  ( -  x   ) and  hence  deduce 

that 

1.  1 - 1 + 1 - 1 + ………… =  2

# MSAJCE  46 

= 1  x2 d sinnx 

 - n

+ (2)  – sinnx 

n3

> 

n n2

= 1 (x 2) sinnx  – (2x) -cosnx 



1 -

= 2 cosn  + 2 cosn 

n2 n2



4

an = (-1) n

n2



bn = 1  f(x) sinnx  dx 

 -



= 1 

 -

x2 d -cosnx 

n

= 1 (x 2) –cosnx  – (2x)  -sinnx  + (2) 



> 

n n2

cosnx 

n3 -

+ + -

 n n n3 n3

4 (-1) n cosnx 

n2



2 +  4 (-1) n cosnx 

3 n=1  n2



2 + 4 

i.e,  x2 =

i.e,  x2 = (-1) n cosnx 



f(x)  = 22 + 

6 n=  1

= 1 -2 cosn  2 cosn  2 cosn  2cosn 

bn = 0

Substituting  the  values  of  a0, an & bn in  equation  (1)  we  get 

# MSAJCE  47 3 n=1  n2

= 2 + 4 -cosx  + cos2x  – cos3x  + ….. 

3 12 22 32

x2 = 2

3

- 4 cosx  + cos2x  + cos3x  - ….. 

12 22 32 -----------(2) 

Put  x = 0 in equation  (2) we  get 

0 = 2 - 4

3

1 – 1 + 1 – 1 + ….. 

12 22 32 42

i.e,  1 – 1 + 1 - ……  =

12 22 32

2

12 

-------------(3) 

Put  x =  in equation  (2) we  get 

2 = 2 - 4 -1 - 1

3 12 22

- 1 - ……… 

32

i.e,  2 - 2 = 4 1 + 1

3 12 22

+ 1 + ……… 

32

= 2 -------------(4) 

6

i.e,  1 + 1 + 1 + …… 

12 22 32

Adding  equations  (3)  & (4)  we  get 

1 - 1 + 1 - …..  + 1 + 1 + 1 +….  = 2 +

12 22 32 12 22 32

2

612 

i.e,  2 1 + 1 + 1 + ....... 

12 32 52 = 32

12 

i.e,  1 + 1 +  1 + 1 ….. 

12 32 52 72

= 2

8

Example  3

Obtain  the  Fourier  Series  of  periodicity  2π  for  f(x) =  ex in  [-π,  π] 

a0 ∞

Let  f(x)  = ---- + ∑(  an cosnx  + bn sinnx)  -------------(1) 

2 n=1 

# MSAJCE  48 a0 = 1

π

∫ f(x)  dx 

π - π

π

= 1 ∫ ex dx 

π - π

π

= 1 [e x]

π - π

= 2 {e π – eπ}

2π 

a0 = 2 sin  hπ 

π

π

an = 1 ∫ f(x) cos nx  dx 

π - π

π

= 1 ∫ ex cos nx  dx 

π - π π

ex

= 1 [cosnx  + n sin  nx] 

π (1+n 2) -π

= 1 e π (-1) n  e π (-1) n

1+n 2π 1+n 2

= (-1) n ( e  π - eπ )

(1+n 2) π

an = 2 (  -1) n sin  hπ 

π(1+n 2)

1

bn = -----

π

∫ f(x)  sin  nx  dx 

π - π

π

= 1 ∫ ex sin nx  dx 

π - π

# MSAJCE  49 π

= 1 ex (sinnx  – n cosnx) 

π (1+n 2) -π

= 1 e π {-n( -1) n}

π 1+n 2 

> 

e- π {-n( -1) n}

1+n 2

= n( -1) n+1  ( e π - e π )

π(1+n 2)

bn = 2n( -1) n+1  sin  hπ 

π(1+n 2)



f(x)  = 1 sin  hπ  + 

π n=1 

2( -1) n sinhπ  cosnx  + 2( -n)( -1) n

π(1+n 2) π(1+n 2)



sinhπ  sinnx 

ex = 1 sin hπ  + 2sin hπ   (-1) n (cos  nx  – n sin  nx) 

π π n=1  1+n 2



sin hπ  1 +  2  (-1) n

π n=1  1+n 2

Example  4

x in  (O,  )

Let  f (x)  =

(2  - x)  in  (, 2) 

> 

1 2

= -------

8

Find  the  FS  for f (x)  and  hence  deduce  that   ---------- 

> n=1

(2n -1) 2

a0 

Let  f (x)  = ------- +  an cosnx  + bn sin  nx  --------- (1) 

2 n=1 

1

Here  a0 = ------

 

> 2

 f(x) dx  +  f (x)  dx   

> o
> 2

1

= ------  x dx+   (2  - x)  dx 

 o 

ie,  ex= (cos  nx  – n sin  nx) 

# MSAJCE  50 1 x2  – (2  - x) 2 2

= +



1 

> 0

22

2

> 

2

------ + ------ = 

2 2

= ------



i.e,  ao = 

1  2

an = -----



 x cos nx  dx +   (2  - x)  cos nx  dx   

> o
> 2

sin  nx  sin  nx 

> 

1

= ----  x d --------- +  (2  - x) d  ---------

 0 n n  

> o
> 

–cos  nx  21

= ----  x d --------- +  (2  - x)  d



–cos  nx 

---------

nno 

1 –cos  nx  –sinnx   –cos  nx  – sinnx  2

= (x)  – (1)  + (2 -x)  – (–1) 

1 sin  nx  -cos  nx   sin  nx  – cosnx 

= ---- (x)  --------- – (1)  ---------- + (2 -x)  --------- – (–1)  ----------

n2

 n

1 cos  n 

> o

n n2

1 cos2n  cosn 

= – – +

 n2 n2 n2 n2

1 2cos  n 2

= –

 n2 n2

2

an = -------- [(  –1) n -1] 

n2 

> 2

1

bn  = -----  f(x) sin nx  dx  +  f(x)  sin nx  dx 



# MSAJCE  51  n n2 o n n2 

1 –  cos  n  cosn 

= + = 0

 n n

i.e,  bn = 0. 

  2

------- [ ( – 1) n – 1]  cos  nx 

n2

f (x)  = ----- + 

2 n=1 

 4 cosx  cos3x  cos5x 

= – + + + . . . .  . (2) 

2  12 32 52

Putting  x =  0 in  equation(2),  we  get 

 4 1 1 1

0 = – + + + . . . .  .

2  12 32 52

1 1 1 2

-------

8

i.e,  ------ + ------ + ------ + . . . . .  =

12 32 52 

> 

1 2

i.e,   = 

> n=1

(2n  – 1) 2 8

Example  5

Find  the  Fourier  series  for  f (x)  = (x +  x2) in  (- < x <  ) of  percodicity  2 and  hence 

> 

deduce  that   (1/  n2) = 2 /6. 

> n=1

a0 

Let  f(x) =  ------- +  ( an cosnx  + bn sinnx) 

2 n=1 

1 

Here,  a0 = ------  (x  + x2) dx 

 –

1 x2 x3

+



=

2 2 3 0

□

# MSAJCE  52 an = -----  f (x) cos  nx  dx 

 – 

> 

sin  nx 1

= -----  (x  + x 2) d ----------

 – n

sin  nx  – cosnx 1

= ----- (x  + x 2) ---------- – (1+2x)  ----------



– sinnx  

----------

n3

+ (2) 

n n2 –

1 (– 1) n (– 1) n

(1  – 2)----------

n2

= ------- (1+  2) --------- –

 n2

4 (– 1) n

an =

n2

1 

bn = -----  f (x) sin  nx  dx 

 – 

> 

– cos  nx 1

= -----  (x  + x 2) d ----------

 – n

1

= ----- (x  + x2)



– cosnx 

---------- – (1+2x) 

n

–sinnx  cosnx  

---------- + (2)  ----------

n2 n3 –

1 2 3 2 3

= + – +

 2 3 2 3

22

ao =

3

1 

# MSAJCE  53 1 – 2(– 1) n  (–1) n  (– 1) n 2 (–1) n

= – – +

 n n n n2

2 (– 1) n+1 

bn =

n

2  4 (– 1) n 2( – 1) n+1 

f(x)  = ------ +  ----------- cos  nx  + -------------- sinnx 

3 12 22 32

2

i.e,  ------ =

6

1 1 1

------ + ------ + ------ +. .  . . .  . .  .

12 22 32

3 n=1  n2 n

2

= -----

cosx  cos2x  cos3x 

 4 ----------  ---------- + ----------  ….. 

12 22 32

sin2x 

+ 2 sin x   ---------+ . . .

.

3 2

Here  x =  - and  x =   are  the  end  points  of  the  range.   The  value  of  FS  at  x =   is  the 

average  of the  values of  f(x) at x  =  and x  = -.

f ( - ) + f ()

 f(x)  =

2

-  + 2 +  + 2

=

2

= 2

Putting  x =  , we  get 

2 1 1 1

2 = ------ + 4 ------ + ------ + ------- + . . .  .

# MSAJCE  54  1 2

Hence,   ----- = -------. 

> n=1

n2 6

a0 

f (x)  = ------ +  an consnx 

2 n=1 

Exercises: 

Determine  the  Fourier  expressions  of  the  following  functions  in  the  given  interval 

1.f(x) =  ( - x) 2, 0  < x < 2

2.f(x) =  0 in  - < x < 0

=  in 0  < x < 

3.f(x)  = x – x2 in  [-,]

4.f(x)  = x(2 -x)  in  (0,2 )

5.f(x)  = sinh  ax  in  [-, ]

6.f(x)  = cosh  ax  in  [-, ]

7.f(x) =  1 in  0 < x  < 

= 2 in   < x < 2

8.f(x)  = -/4  when  - < x < 0

= /4  when  0 < x < 

9.f(x)  = cos x,  in  - < x < , where  „‟ is  not an  integer 

10.Obtain  a fourier  series to  represent  e-ax  from  x =  - to  x = . Hence  derive  the  series 

for   / sinh 

2.3 Even  and  Odd  functions 

A function  f(x)  is  said  to  be  even  if f  (-x)  = f (x).  For  example  x2, cosx,  x sinx,  secx  are 

even  functions.  A function  f (x)  is  said  to  be  odd  if  f (-x)  = - f (x).  For  example,  x3, sin  x, 

x cos  x,.  are  odd  functions. 

(1)  The  Euler‟s  formula  for  even  function  is 

2 2 

where  ao = ----  f(x) dx  ; an = -----  f (x) cosnx  dx 

 0 0

# MSAJCE  55 (2)  The  Euler‟s  formula  for  odd  function  is 

> 

f (x)  =  bn sin  nx 

> n=1

2 

where  bn = -------  f(x)  sin nx  dx 

 0

Example  6

Find  the  Fourier  Series  for  f (x)  = x in  ( - , )

Here,  f(x)  = x is  an  odd  function. 

> 

 f(x) =   bn sin  nx  ------- (1) 

> n=1

2 

bn  = -----  f (x) sin nx  dx 

> 0



2 - cos  nx 

=

> 

 x d

> 0

 n

2 –cos  nx  – sin  nx  

= (x)  - (1) 

 n n2 0

=

2 –  cos  n

 n

2 (– 1)  n+1 

bn =

n 

> 

2 ( – 1) n+1 

f (x)=   --------------- sin  nx  

> n=1

n 

> 

2 ( – 1) n+1 

i.e,  x =  ------------- sin  nx  

> n=1

n

Example  7

# MSAJCE  56 Expand  f (x)  = |x|  in  (-, ) as  FS and  hence  deduce  that 

1 1 1 2

+ + . . . . .  =. 

12 32 52

Solution 

8

Here  f(x)  = |x|  is  an  even  function. 

ao 

 f (x)  = -------- +  an  cos  nx  ------- (1) 

2 n=1 

2 

ao = -----  f(x)  dx 

 0

2 

= -----  x dx 

 0

2 x2 

= ----- -----

 2 0

= 

2 

an = -----  f (x)  cos nx  dx 

 0

2 

 x d

> 0

sin  nx 

=

 n

2 sin  nx  – cos  nx  

= (x)  – (1) 

 n n2 0

2 cos  n 1

= –

 n2 n2

2

an  = ----- [( – 1)  n – 1] 

n2

> 

 2

f (x)=  -------+  ------- [( –1) n – 1]  cos  nx 

2

 

> n=1

n2

4 cos  x cos3x  cos5x 

# MSAJCE  57 i.e,  |x|  = – + + + . . . . .  . (2) 

2  12 32 52

Putting  x = 0 in equation  (2),  we  get 

 4

0 =  ------ – -------

2 

1 1 1

------ + ------ + ------- + . . .  . . .  .

12 32 52

1 1 1 2

Hence,  ------ + ------ + ------+ ….  = -------

12 32 52 8

Example  8

2x 

If  f (x)  = 1 + ----- in  ( - , 0) 



2x 

= 1 – ----- in ( 0,   )



> 

Then  find  the  FS  for f(x) and  hence  show  that   (2n -1) -2 = 2/8 

> n=1

Here  f (-x)  in  (-,0)  = f (x)  in  (0, )

f (-x)  in  (0, ) = f (x)  in  (-,0) 

 f(x)  is  a even  function 

ao 

Let  f (x)  = -------- +  an cos  nx  ------- (1). 

2 n=1 

2  2x 

1 – ------- dx 



ao = ----- 

 0

2

= x –

2x 2 

2 0

a0 = 0

# MSAJCE  58 2 2x 

an = -----  1 – ------- cos  nx  dx 

> 0



2



2x  sin  nx 

=  1 – d

 0  n

> 

2 2x  sin  nx  – 2 – cosnx 

= 1 – –

 

4

an = ------- [(1 – (– 1) n]

2n2

n  n2 0 

> 

4

f (x)=   -------- [1 – (– 1) n]cos  nx  

> n=1

2n2

> 



> n=1

1 2

or  =

(2n –1) 2 8

Example  9

Obtain  the  FS  expansion  of  f(x)  = x sinx  in  (- < x< ) and  hence  deduce  that 

1 1 1  - 2

– + – . . . . .  =

1.3  3.5  5.7  4. 

4 2cos  x 2cos3x  2cos5x 

= + + + . . . . .  . (2) 

2 12 32 52

Put  x = 0 in equation  (2)  we  get 

2 1 1 1

= 2 + + + . . . .  . .  .

4 12 32 52

1 1 1 2

==>  ------ + ------ + ------ + … = -------

12 32 52 8

# MSAJCE  59 Here  f (x)  = xsinx  is  an  even  function. 

ao 

Let  f (x) =  -------- +  an cos  nx  ------------- (1) 

2 n=1 

2 

Now,  ao = -----  xsin  x dx 

 0

2 

= -----  x d (  - cosx) 

 0

2

= ----- (x)  (- cosx)  – (1)  (- sin  x) 



> 

0

a0 = 2

2 

an = -----  f (x)  cos nx  dx 

 0

2 

= -----  x sin x  cosnx  dx 

 0

1 

= -----  x [ sin  (1+n)x  + sin  (1  – n)x]  dx 

> 0



1 

 x d

> 0

– cos  (1+n)x  cos  (1  – n)  x

= –

 1 +  n 1 – n



1 – cos  (1+n)x  cos  (1  – n)  x – sin  (1+n)x  sin  (1  – n)  x

= (x)  – – (1)  –

 1 +  n 1 – n (1  + n) 2 (1  – n) 2

> 0

1 – cos  (1+n)   cos (1  – n)  

= –

1 – n 1 + n

- [cos  cosn  - sin   sinn ] [cos  cosn  - sin   sin  n ]

# MSAJCE  60 = –

1 +  n 1 – n

(1+n)  ( – 1)  n + (1  – n ) ( – 1) n

=

1 – n2

2( –1) n

an = ---------

1 – n2

When n =  1

, Provided  n  1

2 

a1 = -----  x sinx  cos  x dx 

 0

1 

= -----  x sin2x  dx 

 0

1 

 x d

> 0

- cos2x 

=

 2

1 – cos  2x  -sin  2x  

= (x)  – (1) 

 2

Therefore,  a1 = -1/2 

4 0

a0 

f (x)=  -------+ a1 cosx  +  ancos  nx 

2 n=2 

1  2(  -1) n

= 1 – ------ cosx  +  ----------- cosnx 

> n=2

2 1-n2

1

ie,  x sinx  = 1 – ------ cos x  – 2

2

cos2x  cos3x  cos4x 

----------- - ------------ + ----------- - . .  . .

3 8 15 

Putting  x =  /2  in  the  above  equation,  we  get 

 1 1 1

# MSAJCE  61 ----- – 1 = 2 ------ – ------- + -------- – . .  . . . .  .

2 1.3  3.5  5.7 

1 1 1  - 2

Hence,  ------ – ------ + ------- – . . . . .  . = ----------

1.3  1.5  5.7  4

Exercises: 

Determine  Fourier  expressions  of  the  following  functions  in  the  given  interval: 

i.  f(x)  = /2 +  x,  - < x < 0

/2  - x,  0 < x < 

ii.  f(x)  = -x+1  for  + - < x < 0

x+1 for  0 < x < 

iii.  f(x)  = |sinx|,  - < x < 

iv.  f(x) =x 3 in  - < x < 

v. f(x) =  xcosx,  - < x < 

vi.  f(x)  = |cosx|,  - < x < 

2sin  a

vii.  Show  that  for  - < x < , sin  ax =  ---------



sin  x 2sin  2x  3sin3x 

-------- - ------ + -------- - ……. 

12 - 2 22 - 2 32 - 2

2.4  HALF  RANGE  SERIES 

It  is  often necessary  to  obtain a  Fourier  expansion  of a  function  for  the  range 

(0,  ) which  is  half  the  period  of  the  Fourier  series,  the  Fourier  expansion  of  such  a

function  consists  a cosine  or  sine  terms  only. 

(i)  Half  Range  Cosine  Series 

The  Fourier  cosine  series for  f(x)  in  the  interval  (0, ) is given  by 

an cosn  x

a0 

f(x)  = ---- + 

2 n=1 

2 

# MSAJCE  62 where  a0 = -------  f(x)  dx  and 

 0

2 

an = -------  f(x)  cosnx  dx 

 0

(ii)  Half  Range  Sine  Series 

The  Fourier  sine  series  for  f(x)  in  the  interval  (0, ) is  given  by 



f(x)  =  bn sinnx 

n=1 

2

where  bn = -------



Example  10 

> 

 f(x)  sinnx  dx 

> 0

If  c is  the  constant  in  ( 0 <  x <  ) then  show  that 

c = (4c  / ) { sinx  + (sin3x  /3) +  sin5x  / 5) +  ...  ... ...  }

Given  f(x)  = c in  (0, ). 

> 

Let  f(x) =   bn sinnx   

> n=1

 (1) 

2

bn = -------



> 

 f(x)  sin  nx  dx 

> 0

2 

= -------  c sin  nx  dx 

 0

2c  - cosnx  

=

 n 0

2c 

= ----



-(-1) n 1

------ + ----

n n

bn = (2c/n ) [ 1  – (-1) n ]

> 

# MSAJCE  63  f(x)  =  (2c / n ) (1 -(-1) n ) sinnx   

> n=1

4c 

i.e,  c = ---



sin3x 

sinx  + ---------

3

sin5x 

+ ---------- + … …  …

5

Example  11 

Find  the  Fourier  Half  Range  Sine  Series  and  Cosine  Series  for  f(x)  = x in  the  interval 

(0, ). 

Sine  Series 



Let  f(x)  =  -------(1) 

n=1 

bn sinnx 

2

bn = -------

 

> 

2 

Here   f(x) sinnxdx  = ------  x d (  -cosnx  / n) 

0 0

2 - cosnx  - sinnx  

= (x)  - (1) 

 n n2 0

2 -  (-1)  n

=

 n

2( -1)  n+1 

bn = ----------

n

> 

 f(x)  =   

> n=1

Cosine  Series 

2

---- (-1) n+1  sin  nx 

n

a0 

Let  f(x) =  ---- +  an cosnx  ---------(2) 

2 n = 1

2 

Here  a0 = ------  f(x)dx 

 0

# MSAJCE  64 2 

= -------  xdx 

 0

2 x2 

= ------- ---

 2

= 

> 0

2

an = -------



> 

 f(x)  cosnx  dx 

> 0

2

an = -------



> 

 x d (sinnx  / n  ) 

> 0
> 

2

--- +  -----

2 n=1  n2

f(x)  = [ (-1) n - 1]  cosnx 

 4 cosx  cos3x  cos5x 

+ --------- ……  …

52

=>  x = --- + --- ---------- + ----------

2  12 32

Example  12 

Find  the  sine  and  cosine  half -range  series for  the  function function  .

f(x)  = x , 0 <  x  π/2 

= π-x,  π/2 x<  

Sine  series 



Let  f (x)  =  bn sin  nx. 

n=1 

2 sinnx  - cosnx  

= (x)  - (1) 

 n n2 0

2

an = ------ (-1) n -1

n2

# MSAJCE  65 π

bn= (2/  )  f (x)  sin nx  dx 

0

/2  

=(2/  )  x sin nx  dx  +  (-x)  sin  nx  dx 

0 /2 

/2  -cos  nx 

 x .d 

0



+  (-x)  d

/2 

-cos  nx 

= (2/  )

n n

/2 

-cos  nx  -sin  nx 

= (2/  ) x -(1) 

n n2 n n2

2sinn( /2) 

= (2/ )

n=1  n2

sin3x  sin5x 

ie,  f (x)=  ( 4/  ) sinx   +  --------

n n2

0



cos  nx 

+ (-x)  - -

n

sin  nx 

-(-1)  -

n2 /2 

-(/2)cos  n( /2)  sin  n( /2)  -(/2)cosn( /2)  sin  (/2  )

= (2/ ) +  

n2

4

= sin  (n /2) 

n2

 sin(n /2) 

Therefore  , f(x)=  ( 4/  )  sin  nx 

# MSAJCE  66 32 52

Cosine  series 



.Let  f(x) =  (a o /2)  + an cosnx.,  where 

n=1 



ao = (2/ )  f(x)  dx 

0

/2  

=(2/ )  x dx+   (-x)  dx 

0 /2 

n n2

0



sinnx  cosnx 

+ (-x)  -(-1)  -

n n2 /2 

( /2)  sinn( /2)  cos  n( /2)  1

= (2/ ) + 

/2  

=(2/ ) (x 2/2)  + (x –x2/2) 

0 /2 



an = (2/ )  f(x) cosnx  dx 

0

/2  

= /2 

=(2/  )  x cosnx  dx  +  (-x) cosnx  dx 

0 /2 

sinnx /2 

=(2/  )  x d

0



+  (-x)  d

n /2 

sinnx 

n

/2 

sinnx  -cosnx 

= (2/  ) x -(1) 

# MSAJCE  67 n n2 n2

cosnx  ( /2)  sinn( /2)  cos  n( /2) 

+   +

n2 n n2

2cosn (  /2)  - {1+( -1) n}

=(2/ )

n2



Therefore,  f(x)=  ( /4)+(2/ ) 

n=1 

2 cos n(  /2) - {1+( -1) n }

cosnx  .

n2

cos6x 

= (  /4) -(2/ ) cos2x+  +-------------

32

Exercises 

1.Obtain  cosine  and  sine  series  for  f(x)  = x in  the  interval  0<  x <  . Hence  show  that  1/1 2

+ 1/3 2 + 1/5 2 + … =  2/8. 

2.Find  the  half  range  cosine  and  sine  series  for  f(x)  = x2 in  the  range  0 < x < 

3.Obtain  the  half -range  cosine series for  the  function f(x) =  xsinx  in  (0, ).. 

4.Obtain  cosine  and sine series for  f(x)  = x (-x) in  0<  x < 

5.Find  the  half -range  cosine series  for  the  function 

6.f(x)  = (x) / 4  , 0<x<  (/2) 

= (/4)( -x),  /2  < x  < .

7.Find  half  range  sine  series  and  cosine  series  for 

f(x) =  x in  0<x<  (/2) 

= 0 in  /2  < x <  .

8.Find  half  range  sine  series  and  cosine  series  for  the  function  f(x)  ==   - x in  the  interval 

0 <  x < .

9.Find  the  half  range  sine  series  of  f(x)  = x cosx in  (0, )

# MSAJCE  68 [f  (x)]  r m s  =

The  use  of  r.m.s value of  a periodic  function  is  frequently  made  in  the 

theory  of mechanical  vibrations  and  in  electric  circuit  theory.  The  r.m.s  value  is 

also  known  as  the effective  value  of  the  function. 

Parseval’s  Theorem 

If  f(x)  defined  in  the  interval  (c, c+2π  ),  then  the  Parseval‟s  Identity  is given  by 

c+2π 

∫ [f  (x)] 2

c

dx  = (Range) 

or 

= ( 2π) 

Example  13 

Obtain  the  Fourier  series  for  f(x)  = x2 in  – π < x < π

Hence  show  that  . π4

90 

1 + 1 + 1 + . .

14 24 34

4 (-1) n

2π 2

3 , an =we  have  ao = n2 , bn = 0,  for  all  n (Refer  Example  2). 

By  Parseval‟s  Theorem,  we  have 

π ao 2 ∞

b

∫ [f(x)] 2 dx 

a

b – a

> 2

ao  1

+ ∑ ( an2 + bn2 )

4 2

ao 2 1

+ ∑ ( an2 + bn2 )

24

=

10.Obtain  cosine  series  for 

f(x)  = cos  x , 0<x<  (/2) 

= 0,  /2 < x <  .

2.5  Parseval’s  Theorem 

Root  Mean  square  value  of  the  function  f(x)  over  an  interval  (a,  b) is  defined  as 

# MSAJCE  69 ∫ [ f(x)] 2 dx  = 2π 

- π

+ ½ ∑  (a n2 + bn2)

> n=1

4

π

∫ x4 dx 

- π

4π 4 ∞ 16( -1)  2n 

i.e,  = 2π  + 1/2  ∑

36  n=1  n4

π π4 ∞ 1

i.e,  x5 = 2π  + 8 ∑

5 -π

π4

9 n=1  n4

1π4 ∞

+ 8 ∑ 

> n=1

n4

=

5 9 

> ∞

1 π4

=>  ∑ = 

> n=1

n4 90 

Hence  .1 + 1 + 1 + . .

14 24 34

π4

90 

2.6  CHANGE  OF  INTERVAL 

In  most  of  the  Engineering  applications,  we  require  an  expansion  of  a given 

function  over  an interval  2l other  than  2.

Suppose  f(x)  is a  function  defined in  the  interval c<  x < c+2 l. The  Fourier 

expansion  for  f(x)  in  the  interval  c<x<c+2 l is  given  by 

f(x)  =

a0

-----

2



+ 

n=1 

an

nx

cos  ---- + bn

l

nx

sin  ----

l

where  a0 =

1

-----

l

c+2  l



c

f(x)dx 

an =

1

-----

c+2  l

 f(x)  cos  (n x /  l ) dx  &

l c

bn =

1

-----

c+2  l

 f(x)  sin  (n x /  l ) dx 

l c

=

# MSAJCE  70 Even  and  Odd  Function 

If  f(x)  is  an  even  function  and  is  defined  in  the  interval  ( c,  c+2  l ),  then 

f(x)  =

a0 

----- + 

nx

an cos  ----

2 n=1  l

where  a0 =

2

-----

l

 f(x)dx 

l 0

an =

2

-----

l

 f(x)  cos  (n x / l ) dx 

l 0

If  f(x)  is  an  odd  function  and  is  defined  in  the  interval  ( c,  c+2  l ),  then 





n=1 

nx

bn sin  ----

l

f(x)  =

where 

2 l

bn = ----- 

l 0

f(x)  sin  (n x /  l ) dx 

Half  Range  Series 

Sine  Series 





nx

bn sin  ----

l

f(x)  =

n=1 

where 

2 l

bn = -----  f(x)  sin  (n x / l ) dx 

l 0

Cosine  series 

a0  nx

an cos  ----

l

f(x)  = ----- + 

2 n=1 

# MSAJCE  71 where  a0 =

2

-----

l

l

 f(x)dx 

0

an =

2

-----

l

 f(x)  cos  (n x / l ) dx 

l 0

Example  14 

Find  the  Fourier  series  expansion  for  the  function 

f(x)  = (c/ℓ)x  in  0<x<ℓ 

= (c/ℓ)(2ℓ - x)  in  ℓ<x<2ℓ 

> 

a0 nx nx

+ bn sin  ------

ℓ

Let  f (x) =  ------ +  an cos  ------

> n=1

2 ℓ

1 2l

Now,  a0 = -----  f(x)dx 

l 0

1 ℓ 2ℓ 

(c/ℓ)   x dx  + (c/ℓ)   (2ℓ  - x)  dx = ------

ℓ o ℓ

1 ℓ 2ℓ 

= ----- (c/ℓ) (x 2 / 2)  + (c/ℓ) (2ℓx  - x2/2) 

ℓ 0 ℓ

c

= ---- ℓ2 = c

ℓ2

1 2ℓ 

an = -----  f(x)  cos  (n x / ℓ ) dx 

ℓ 0

1 ℓ

 (c/ℓ)x  cos 

ℓ 0

nx 2ℓ 

dx +   (c/ℓ)(2ℓ - x)  cos 

ℓ

nx

= dx 

ℓ ℓ

c ℓ

 x d

0

sin(n x /ℓ)  2ℓ 

+  (2ℓ - x)  d

ℓ

sin(n x /ℓ) 

=

ℓ2 n /ℓ  n /ℓ 

# MSAJCE  72 ℓ

nx nx

sin  -cos 

c ℓ ℓ

= ( x )  (1) 

ℓ2 n

ℓ

n22

ℓ2 0

nx 2ℓ nx

-cos 

ℓ

sin 

ℓ

+ (2ℓ - x)  (-1) 

n

ℓ

n22

ℓ2

ℓ

c ℓ2 cosn  ℓ2 ℓ2 cos2n  ℓ2 cosn 

=  +  +

ℓ2 n22 n22 n22 n22

c ℓ2

= { 2 cosn   2 }

ℓ2 n22

2c 

= { (-1) n 1} 

n22

1 2ℓ 

 f(x)  . sin 

ℓ 0

nx

bn = dx 

ℓ

1 ℓ

 (c/ℓ)x  sin 

ℓ 0

nx 2ℓ 

dx +   (c/ℓ)(2ℓ - x)  sin 

ℓ

nx

= dx 

ℓ ℓ

c ℓ cos(n x /ℓ)  cos(n x /ℓ) 2ℓ 

+  (2ℓ - x) d  -

ℓ

=  x d -

0ℓ2 n /ℓ  n /ℓ 

# MSAJCE  73 ℓ

nx nx

cos  sin 

c ℓ ℓ

= (x)   (1)  

ℓ2 n

ℓ

n22

ℓ2

0

nx nx 2ℓ 

cos  sin 

ℓ ℓ

+ (2ℓ - x)    (-1)  

2 2 n=1  n2

c 2c   { (-1) n 1} 

Therefore,  f(x)  = --- + ----  ------------- cos  (n x /ℓ) 

Example  15 

Find  the  Fourier  series of periodicity  3 for  f(x)  = 2x  – x2 , in  0  x  3. 

Here  2ℓ =  3. 

 ℓ =  3 /  2. 

> 

a0 2n x 2n x

Let  f (x) =  ------ +  an cos  ------ + b n sin  ------

> n=1

2 3 3

> 3

where  ao = (2 / 3)   (2x  - x2) dx 

> 0
> 3

= (2 /  3)  2 (x 2/2)  – (x 3/3)  dx  0

n

ℓ

n22

ℓ2

ℓ

c ℓ2 cosn  ℓ2 cosn 

=  +

ℓ2 n n

= 0. 

# MSAJCE  74 = 0.  

> 3

2n x

an = (2 / 3)   (2x  - x2) cos  ------ dx  

> 0

3

sin(2n x /3) 3

= (2 / 3)   (2x  - x2) d 

> 0

(2n /3) 

> 3

sin(2n x /3)  cos(2n x /3)  sin(2n x/3) 

= (2 /  3)  (2x  - x2) – (2  -2x)  - + (-2)  -

(2n /3)  (4n 22/9)  (8n 33/27)  0

= (2 /  3)  - ( 9 / n 22) – ( 9 / 2n 22) = - 9 /  n22 

> 3

2n x

bn = (2 /  3)   (2x  - x2) sin  ------ dx  

> 0

3

cos(2n x /3) 3

= (2 / 3)   (2x  - x2) d – 

> 0

(2n /3) 

> 3

(2n /3)  2 2

(4n   /9)  3 3

(8n   /27)  0

Exercises 

1.Obtain  the  Fourier  series  for  f(x)  = x in  0 < x < 2. 

2.Find  the  Fourier  series  to  represent  x2 in  the  interval  (-l,  l ). 

3.Find  a Fourier  series  in  (-2,  2),  if 

f(x)  = 0,  -2 < x <  0

= (2 /  3)  ( 9 /2n ) – ( 27/ 4n 33) + ( 27/  4n 33)

= 3 /  n

2n x 2n x

f (x)  =  - ( 9 / n22) cos  ------ + (3  / n) sin  ------ 

> n=1

3 3

Therefore, 

cos(2n x /3)  sin(2n x /3)  cos(2n x/3) 

= (2 / 3)  (2x  - x2) – – (2  -2x)  - + (-2) 

# MSAJCE  75 = 1, 0 <  x < 2. 

4.Obtain  the  Fourier  series  for 

f(x) =  1-x in  0 < x < l

= 0 in  l < x < 2 l. Hence  deduce  that 

1- (1/3 )  +(1/5)  – (1/7)  + … =  /4  &

(1/1 2) + (1/3 2) + (1/5 2) +  … =  (2/8) 

5.If  f(x)  = x,  0 < x < 1

= (2 -x),  1 < x < 2, 

Show  that  in  the  interval  (0,2), 

cos  x cos3 x cos  5x

f(x)  = (/2)  – (4/ ) --------- + --------

12 32

6.Obtain  the  Fourier  series  for 

+ ……. + ------

52

f(x)  = x in  0 < x < 1

= 0 in 1 < x  < 2

7.Obtain  the  Fourier  series  for 

f(x)  = (cx  /l ) in 0 <  x <  l

= (c/ l ) (2  l - x ) in  l < x < 2 l .

8.Obtain  the  Fourier  series  for 

f(x)  = (l + x ),  - l < x < 0. 

= (l - x ),  0 < x < l.

 1 2

Deduce  that   -------- = ------

1 (2n  – 1) 2 8

9.Obtain  half -range  sine series  for  the  function 

f(x)  = cx  in  0 < x  < ( l /2) 

= c (l – x)  in ( l/ 2)  < x < l

10.Express  f(x)  = x as  a half  – range  sine  series  in  0 < x < 2

11.Obtain  the  half -range  sine series for e x in 0 < x <  1. 

# MSAJCE  76 12.Find  the  half  –range cosine series  for  the function f(x)  = (x -2) 2 in  the  interval 

0 <  x < 2. 

 1

Deduce  that 

x:  0 π/3  2π/3  π 4π/3  5π/3  2π 

f(x):  1.0  1.4  1.9  1.7  1.5  1.2  1.0 

ie,  f(x)  = (a 0/2)  + (a 1 cosx  + b1 sinx)  + (a 2 cos2x  + b2 sin2x)  +

(a 3cos3x +  b3sin3x)+…  -------------(1) 

2 ∑  f(x) 

Here  a0 = 2 [mean  values  of  f(x)]  = -----------

n

2 ∑ f(x)  cosnx 

an = 2 [mean values  of f(x) cosnx]  = ---------------------

n

2 ∑ f(x)  sinnx 

& bn = 2 [mean  values  of  f(x)  sinnx]  = -------------------

n

In  (1),  the  term  (a 1cosx  + b1 sinx)  is  called  the  fundamental  or  first  harmonic ,

the  term  (a 2cos2x  + b2sin2x)  is  called  the  second  harmonic  and  so  on. 

Example  16 

Compute  the  first  three  harmonics  of  the Fourier  series  of  f(x)  given  by  the 

following  table. 

We  exclude the  last point  x = 2π. 

Let  f(x)  = (a 0/2)  + (a 1 cosx  + b1 sinx)  + (a 2 cos2x  + b2 sin2x)  + ………… 

To  evaluate  the coefficients,  we  form  the  following  table. 

2 n=1 

1 (2n  – 1) 2

2

 -------- = -----

8

2.7  Harmonic  Analysis 

The  process  of  finding  the  Fourier  series  for  a function  given  by  numerical  values 

is  known  as  harmonic  analysis. 

a0 

f (x)  = ------- +  (a n cosnx  + bn sinnx),  where 

# MSAJCE  77 x f(x)  cosx  sinx  cos2x  sin2x  cos3x  sin3x 

0 1.0  1 0 1 0 1 0

π/3  1.4  0.5  0.866  -0.5  0.866  -1 0

2π/3  1.9  -0.5  0.866  -0.5  -0.866  1 0

π 1.7  -1 0 1 0 -1 0

4π/3  1.5  -0.5  -0.866  -0.5  0.866  1 0

5π/3  1.2  0.5  -0.866  -0.5  -0.866  -1 0

2 ∑f(x)  2 (1.0  + 1.4 +  1.9  + 1.7 +  1.5 +  1.2) 

Now,  a0 =

: 0o 60 o 120 o 180 o 240 o 300 o

x:  0 1 2 3 4 5

y:  4 8 15  7 6 2

 Fourier  cosine  series  in  the  interval  (0,  2π)  is 

y = (a 0 /2)  + a1cos  + a 2cos2  + a3cos3  + ….. 

To  evaluate  the coefficients,  we  form  the  following  table. 

= = 2.9 

6 6

2 ∑f(x)  cosx 

a1 = = -0.37 

6

2 ∑f(x)  cos2x 

a2 = = -0.1 

6

2 ∑f(x)  cos3x 

a3 = = 0.033 

6

2 ∑f(x)  sinx 

b1 = ---------------- = 0.17 

6

2 ∑f(x)  sin2x 

b2 = = -0.06 

6

2 ∑f(x)  sin3x 

b3 = = 0

6

 f(x)  = 1.45  – 0.37cosx  + 0.17 sinx  – 0.1cos2x  – 0.06  sin2x  + 0.033  cos3x+… 

Example  17 

Obtain  the  first  three  coefficients  in  the  Fourier  cosine  series  for  y,  where  y is 

given  in  the  following  table: 

Taking  the  interval  as  60 o, we  have 

x:  0 1 2 3 4 5

y:  4 8 15  7 6 2

# MSAJCE  78 o cos  cos2  cos3  y y cos  y cos2  y cos3 

0o 1 1 1 4 4 4 4

60 o 0.5  -0.5  -1 8 4 -4 -8

120 o -0.5  -0.5  1 15  -7.5  -7.5  15 

180 o -1 1 -1 7 -7 7 -7

240 o -0.5  -0.5  1 6 -3 -3 6

300 o 0.5  -0.5  -1 2 1 -1 -2

Total  42  -8.5  -4.5  8

x:  0 T/6  T/3  T/2  2T/3  5T/6  T

y:  1.98  1.30  1.05  1.30  -0.88  -0.25  1.98 

Now,  a0 = 2 (42/6)  = 14 

a1 = 2 (  -8.5/6)  = - 2.8 

a2 = 2 (-4.5/6)  = - 1.5 

a3 = 2 (8/6) =  2.7 

y = 7 – 2.8 cos  - 1.5  cos2  + 2.7  cos3  + ….. 

Example  18 

The  values of  x and the corresponding  values of f(x)  over a  period  T are  given 

below.  Show  that  f(x)  = 0.75  + 0.37  cos  + 1.004 sin ,where   = (2πx  )/T 

We  omit  the  last  value  since  f(x)  at  x = 0 is  known. 

Here   = 2πx 

T

When  x varies from  0 to T,   varies from  0 to 2π with  an increase  of  2π  /6. 

Let  f(x)  = F(  ) = (a 0/2)  + a1 cos  + b1 sin .

To  evaluate  the coefficients,  we  form  the  following  table. 

 y cos  sin  y cos  y sin 

0 1.98  1.0  0 1.98  0

π/3  1.30  0.5  0.866  0.65  1.1258 

2π/3  1.05  -0.5  0.866  -0.525  0.9093 

Π 1.30  -1 0 -1.3  0

4π/3  -0.88  -0.5  -0.866  0.44  0.762 

5π/3  -0.25  0.5  -0.866  -0.125  0.2165 

4.6  1.12  3.013 

Now,  a0 = 2 ( ∑ f(x)  / 6)=  1.5 

# MSAJCE  79 a1 = 2 (1.12  /6)  = 0.37 

a2 = 2 (3.013/6)  = 1.004 

Therefore,  f(x) =  0.75 + 0.37 cos  + 1.004  sin 

# MSAJCE  80 Exercises 

1.The  following  table  gives  the  variations  of  periodic  current  over  a period. 

t (seconds)  : 0 T/6 

A (amplitude):  1.98  1.30 

T/3  T/2  2T/3  5T/6  T

1.05  1.30  -0.88  -0.25  1.98 

Show  that  there  is  a direct  current  part  of  0.75  amp  in  the  variable  current  and  obtain  the 

amplitude  of  the  first  harmonic. 

2.The  turning  moment  T is  given  for  a series  of values  of  the crank  angle    = 75 

In  the  interval  (c,  c+2ℓ),  the  complex  form  of  Fourier  series  is  given  by 

> c+2π

cn = 1 ∫ f(x)  e – i nx  dx 

2π  c   

> inπx
> ℓ

∞

f(x)  = ∑ cn e

n= -∞

1

cn = -------

2ℓ 

Dirichlet‟s  conditions  can  be  given  in  the  form  of  -inx 

f(x)  = ∑ cn e ,

n =  -∞

where  ,

where,     

> c+2ℓ -in π x

∫ f(x)  e ℓ dx 

> c

  : 0 30  60  90  120  150  180 

T : 0 5224  8097  7850  5499  2626  0

Obtain  the  first  four  terms  in  a series  of  sines  to  represent  T and  calculate 

T for   = 75 

3.  Obtain  the  constant term  and  the  co -efficient  of the  first  sine  and  cosine  terms  in  the 

Fourier expansion  of  „y‟  as  given in  the  following  table. 

X : 0 1 2 3 4 5

Y : 9 18  24  28  26  20 

4.  Find  the  first  three  harmonics  of  Fourier  series  of  y = f(x)  from  the  following  data. 

X : 0  30 

Y : 298  356 

60  90  120  150  180  210  240  270  300  330 

373  337  254  155  80  51  60  93  147  221 

2.8  Complex  Form  of  Fourier  Series 

The  series  for  f(x)  defined in  the  interval  (c,  c+2π)  and  satisfying 

∞

# MSAJCE  81 Example  19 

Find  the  complex  form of  the  Fourier series  f(x)  = e –x in  -1 ≤ x ≤ 1.    

> inπx

∞

f(x)  = ∑ cn e

n= -∞

> l

We  have 

where  e –x - i n π x

e dx cn = 1 ∫

2 -1      

> 1-(1+ inπ) x

∫ ecn = 1

2

dx 

> -1

= 1 e - (1+i  nπ)  x 1

2 - (1+inπ)  -1

= 1 .

-2 ( 1+inπ  ) e - (1  + i  n π)  x -e (1+  i nπ) 

= (1 -inπ)  [ e-1 ( cos nπ  – isin nπ)  - e (cos nπ  + i sin nπ) ] 

-2 ( 1+n 2π2)

= (1 -inπ)  cos  nπ  ( e-1 - e )

-2 ( 1+n 2π2)

(1 -inπ) 

Cn = -----------

(1+n 2π2)

(-1) n sinh1 

 f(x)  = ∑ ----------- n

(-1)  sinh1  e

n=  - ∞ (1+n 2π2)

Example  20 

Find  the  complex  form  of the  Fourier  series  f(x)  = ex in  - π < x < π. 

∞

We  have  f(x)  = ∑ Cn e i nx 

n= -∞

1 π

where  Cn = ------ ∫ f(x)  e – i nx  dx 

2π  - π

∞ (1 -inπ)  i n π x

# MSAJCE  82 ex e –i nx  dx 

e (1 -i n)  x dx 

1 π

= ------ ∫

2π  - π

1 π

= ------- ∫

2π  - π

π

1

2π 

e (1 -in)x 

= ( 1-in) 

-π

= 1

2π(1 -in) 

[ e(1 -in)π  -e - (1 -i n)  π]

(1+in) 

= -----------

2π(1+n) 2

[ eπ ( cos  nπ  – i sin  nπ  ) –e -π ( cosn  π +  i sin  nπ)] 

(1+in)  (-1) n . e π – e-π

=

( 1+n 2)

(-1) n(1+in)  sin  h π

2π 

=

( 1+n 2) π

∞ (-1) n(1+in)  sin  h π

∑ -----------------------

n=  - ∞ ( 1+n 2) π

 f(x)  = e i nx 

Exercises 

Find  the  complex form  of  the  Fourier  series  of  the  following  functions. 

1.f(x)  = eax , -l < x < l.

2.f(x) =  cosax,  - < x < .

3.f(x)  = sinx, 0  < x < .

4.f(x)  = e-x, -1 < x < 1.

5.f(x)  = sinax, a  is  not an  integer in ( -,  ). 

# MSAJCE  83 2.9  SUMMARY(FOURIER  SERIES) 

A Fourier  series  of  a periodic  function  consists  of  a sum  of  sine  and  cosine  terms .

Sines  and  cosines  are  the  most  fundamental  periodic  functions .The  Fourier  series  is 

named  after  the  French  Mathematician  and  Physicist  Jacques  Fourier  (1768  – 1830 ).

Fourier  series  has  its  application  in  problems  pertaining  to  Heat  conduction,  acoustics, 

etc . The  subject  matter  may  be  divided  into  the  following  sub  topics .

## FORMULA  FOR  FOURIER  SERIES 

Consider  a real -valued  function f(x) which obeys  the following  conditions  called 

Dirichlet‟s  conditions  :

1.  f(x)  is defined  in an  interval  (a,a+2 l), and  f(x+2 l) =  f(x) so  that  f(x) is  a periodic 

function  of  period  2l.

2.  f(x) is continuous or has  only  a finite number  of  discontinuities in the  interval 

(a,a+2 l). 

3.  f(x) has no or only  a finite number  of  maxima  or  minima  in the  interval  (a,a+2 l). 

Also,  let 

a0  l  f (x)dx 

1a  2l

> a

(1) 

#   

f (x) cos  xdx ,

l

 n

 

> a

an  l

1a  2l

n  1,2,3,.....  (2) 

#  

> a

 

f (x)sin  xdx ,

l

 n

 

bn  l

1a  2l

n  1,2,3,......  (3) 

Then,  the  infinite  series   

  n1

> 0

2 n n x x  b sin  

l l

 a cos 

a

 n

   n (4) 

FOURIER  SERIES 

Series  with 

arbitrary  period 

Half -range  series  Complex  series  Harmonic  Analysis 

# MSAJCE  84 is  called  the  Fourier  series  of  f(x)  in  the  interval  (a,a+2 l).  Also,  the  real  numbers  a0, a1,

a2, ….a n, and  b1, b2 , ….b n are  called  the Fourier  coefficients  of  f(x).  The  formulae  (1), 

(2)  and  (3)  are  called  Euler‟s  formulae. 

It  can  be  proved  that  the  sum  of  the  series  (4)  is  f(x)  if  f(x)  is  continuous  at  x.  Thus  we 

have  

   

> 0

2 n1

> n

#  nf(x)  =  a cos  n   n

 a

 x  b sin  x …….  (5) 

l l

Suppose  f(x)  is  discontinuous  at  x,  then  the  sum  of  the  series  (4)  would  be 

1 f (x )  f (x )2

where  f(x +) and  f(x -) are  the  values  of  f(x)  immediately  to  the  right  and  to  the  left  of  f(x) 

respectively. 

# 

# 

a0  l  f (x)dx 

Particular  Cases 

Case  (i) 

Suppose  a=0.  Then  f(x)  is  defined  over  the  interval  (0,2 l).  Formulae  (1),  (2),  (3)  reduce 

to 

12l

 

 

> n
> n

ll

ll

a 

> 0
> 0
> 0

b  f (x)sin  xdx ,

12l

f (x) cos  xdx ,

12l

 n

 

 n

  n  1,2,......  (6) 

Then  the  right -hand side of  (5)  is the  Fourier expansion of  f(x) over  the  interval  (0,2 l). 

If  we  set  l=, then  f(x)  is  defined  over  the  interval  (0,2 ).  Formulae  (6)  reduce  to 

1 2

> 

a0 =

  f (x)dx 

> 0

1 2

> 

an 

  f (x)cos  nxdx  , 

> 0

n=1,2,…..   (7) 

1 2

> 

bn 

  f (x)sin  nxdx  n=1,2,…..  

> 0

Also,  in  this  case,  (5)  becomes 

f(x)  =

> 
> n1
> 0

2 n n a cos nx   b sin  nx 

a (8) 

# MSAJCE  85       



     

> 32x3

 e2 x  2  e2 x   e2 x   e2 x 

#  x e dx   x  2   3x  4   6x 8   6 16   

> 32

n

 cos  nx  

n

  2x   2

n

We illustrate the rule, through  the  fo ll coowsinnxgexam pl es si :nnx  

#  x2 sin  nxdx   x2 

Case  (ii) 

Suppose  a= -l. Then  f(x)  is  defined  over  the  interval  (-l , l).  Formulae  (1),  (2)  (3)  reduce 

to 

n =1,2,……   (9) 

Then  the  right -hand  side  of  (5)  is the  Fourier  expansion of  f(x) over the  interval ( -l , l). 

If  we  set  l = , then  f(x)  is  defined  over  the  interval  (-, ).  Formulae  (9)  reduce  to 

> 
> 

a0 =

  f (x)dx 

1

> 
> 
> 

1

> 

an 

  f (x)cos  nxdx  , n=1,2,…..   (10) 

bn 

  f (x)sin  nxdx 

> 
> 

1

> 

n=1,2,…..  

Putting  l =  in (5),  we  get  

> 0

2 n1

#  n nf(x)  =  a cos nx   b sin  nx 

a

Some  useful  results  :

1.  The  following  rule  called  Bernoulli‟s  generalized  rule  of  integration  by  parts  is  useful 

in  evaluating  the  Fourier  coefficients. 

# uvdx   uv   u'v  u'' v  .......   

> 123

Here  u,u ,…..  are  the successive  derivatives of u  and 

v1  vdx ,v2  v1dx ,...... 



> l

 ll l

an   n

 

#  f (x) cos  xdx 

1 l

1 l

a0  l  f (x)dx 

#   l 

> n

ll

b  f (x) sin   xdx ,

1 l

 n

 

# MSAJCE  86 2.  The  following  integrals  are  also  useful  :

eax 

eax  

> ax

 b cos bx e sin  bxdx   a2  b2 asin  bx  

> ax

 bsin  bx e cos bxdx   a2  b2 acos bx 

3.  If  „n‟  is integer,  then 

sin n  = 0 , cosn  = (-1) n , sin2n  = 0,  cos2n =1 

ASSIGNMENT 

1.  The  displacement  y of  a part of a  mechanism is  tabulated with  corresponding  angular 

movement  x0 of  the  crank.  Express  y as  a Fourier series  upto  the  third  harmonic. 

x0 0 30  60  90  120  150  180  210  240  270  300  330 

y 1.80  1.10  0.30  0.16  1.50  1.30  2.16  1.25  1.30  1.52  1.76  2.00 

2.  Obtain  the  Fourier  series  of  y upto  the  second  harmonic  using  the  following  table  :

x0 45  90  135  180  225  270  315  360 

y 4.0  3.8  2.4  2.0  -1.5  0 2.8  3.4 

3.  Obtain  the  constant  term  and  the  coefficients  of the  first  sine  and  cosine  terms  in  the 

Fourier expansion  of y  as  given  in  the  following  table  :

low 

x 0 1 2 3 4 5

y 9 18  24  28  26  20 

4.  Find  the  Fourier  series  of  y upto  the  second  harmonic  from  the  following  table  :

x 0 2 4 6 8 10  12 

Y 9.0  18.2  24.4  27.8  27.5  22.0  9.0 

5.  Obtain  the  first  3 c

x 0

oefficients  i

1

n the  Fourier  cosine  series  for 

2 3

y,  where  y is 

4

given  be 

5

y 4 8 15  7 6 2

# MSAJCE  87 Let  y = X(x) .  T(t) be  the  solution of  (1), where  „X‟  is a function of  „x‟  only  and  „T‟  is  a

function  of  „t‟  only. 

2y

t2

2y

x2

Then  = X T′′  and  = X′′  T. 

Substituting  these  in  (1),  we  get 

2y

t2

2y

= a2

x2

## UNIT  – III 

## APPLICATIONS  OF  PARTIAL  DIFFERENTIAL 

## EQUATIONS 

3.1  INTRODUCTION 

In  Science  and  Engineering  problems,  we  always  seek  a solution  of  the 

differential  equation  which  satisfies  some  specified  conditions  known  as  the  boundary 

conditions . The  differential  equation  together  with  the  boundary  conditions  constitutes  a

boundary  value  problem . In  the  case  of  ordinary  differential  equations,  we  may  first  find 

the  general  solution  and  then  determine  the  arbitrary  constants  from  the  initial  values . But 

the  same  method  is  not  applicable  to  partial  differential  equations  because  the  general 

solution  contains  arbitrary  constants  or  arbitrary  functions . Hence  it  is  difficult  to  adjust 

these  constants  and  functions  so  as  to  satisfy  the  given  boundary  conditions . Fortunately, 

most  of  the  boundary  value  problems  involving  linear  partial  differential  equations  can  be 

solved  by  a simple  method  known  as  the  method  of  separation  of  variables  which 

furnishes  particular  solutions  of  the  given  differential  equation  directly  and  then  these 

solutions  can  be  suitably  combined  to  give  the  solution  of  the  physical  problems .

3.2Solution  of  the  wave  equation 

The  wave  equation  is 

-----------(1)  .

X T′′  = a2 X′′  T. 

X′′  T′′ 

i.e,  = ---------------(2). 

X a2T

# MSAJCE  88 Now  the  left  side  of  (2) is  a function  of  „x‟  only  and  the  right  side  is  a function  of  „t‟  only .

Since  „x‟  and  „t‟  are  independent  variables,  (2) can  hold  good  only  if  each  side  is  equal  to 

a constant .

X′′  T′′ 

Therefore,  = = k (say). 

X a2T

Hence,  we get  X′′   kX =  0 and  T′′   a2 kT =  0.  --------------(3). 

Solving  equations  (3),  we  get 

(i)  when  „k‟  is positive  and k =  2, say 

X = c1 ex + c2 e - x

T = c3 eat + c4 e - at

(ii)  when  „k‟  is negative  and k  =  2, say 

X = c5 cos x + c6 sin  x

T = c7 cosa t + c8 sin  at

(iii)  when  „k‟  is  zero. 

X = c9 x + c10 

T = c11  t + c12 

Thus  the  various  possible  solutions  of  the  wave  equation  are 

y = (c 1 ex + c2 e - x) (c 3 eat + c4 e - at)

y = (c 5 cos x + c6 sin  x)  (c 7 cosa t + c8 sin  at) 

y = (c 9 x + c10 ) (c 11  t + c12 )

------------(4) 

-----------(5) 

------------(6) 

Of  these  three  solutions,  we  have  to  select  that  particular  solution  which  suits  the 

physical  nature  of  the  problem  and  the  given  boundary  conditions . Since  we  are  dealing 

with  problems  on  vibrations  of  strings,  „y‟  must  be  a periodic  function  of  „x‟  and  „t‟ .

Hence  the  solution  must  involve  trigonometric  terms. 

Therefore,  the  solution given  by  (5), 

i.e,  y = (c 5 cos x + c6 sin  x) (c 7 cosa t + c8 sin  at) 

# MSAJCE  89 is  the  only  suitable  solution  of  the  wave  equation. 

llustrative  Examples. 

Example  1

If  a string  of  length  ℓ is  initially  at  rest  in  equilibrium  position  and  each  of  its  points  is 

given 

 y x

the  velocity  = vo sin  , 0  x  ℓ. Determine  the displacement  y(x,t). 

t t =  0 ℓ

Solution 

The  displacement  y(x,t)  is  given  by  the  equation 

2y

t2

2 y

= a2

x2

-----------(1) 

The  boundary  conditions  are 

i.  y(0,t) =  0,  for  t  0. 

ii.  y(ℓ,t)  = 0,  for  t  0. 

iii.  y(x,0)  = 0, for 0  x  ℓ. 

x

iv.  = vo sin 

 y

t t =  0 ℓ

, for  0 x  ℓ. 

Since  the  vibration of  a string  is periodic,  therefore, the  solution of  (1)  is  of  the  form 

y(x,t)  = (Acos x + Bsin x)(Ccos at  + Dsin at)  ------------(2) 

Using  (i)  in  (2)  , we  get 

0 = A(Ccos at  + Dsin at)  , for  all  t  0. 

# MSAJCE  90 Therefore,  A =  0

Hence  equation  (2)  becomes 

y(x,t)  = B  sin x(Ccos at  + Dsin at)  ------------(3) 

Using  (ii)  in  (3),  we  get 

0 = Bsin ℓ (Ccos at  + Dsin at),  for  all  t  0,  which  gives  ℓ = n.

n

Hence,   = , n being  an  integer. 

ℓ

nx nat  nat 

Thus  , y(x,t)  = Bsin  Ccos  + Dsin  ------------------(4) 

 y

=  Bn sin  .cos  .

 t n=1  ℓ ℓ

 nx nat  na

ℓ

ℓ ℓ ℓ

Using  (iii)  in  (4), we  get 

nx

0 = Bsin  . C

ℓ

which  implies  C =  0. 

nx nat 

 y(x,t) =  Bsin  . Dsin 

ℓ ℓ

nx

= B1sin  . sin 

ℓ

nat 

, where  B1= BD. 

ℓ

The  most  general  solution  is 

 nx nat 

y(x,t)  =  Bn sin  sin  ----------------(5) 

n=1  ℓ ℓ

Differentiating  (5)  partially  w.r.t  t,  we  get 

# MSAJCE  91 Using  condition  (iv)  in  the  above equation,  we  get 

2 y

= a2

x2

-----------(1) 

The  boundary  conditions  are 

2y

t2

x 

=  Bn .

n=1 

na nx

vo sin  . sin 

ℓ ℓ ℓ

x a x 2a 2x

i.e,  vo sin 

· · · · ·

= B1 . . sin  + B2 . . sin  + · ·

ℓ ℓ ℓ ℓ ℓ

Equating  like  coefficients  on  both  sides,  we  get 

a 2a 3a

B1 = vo , B2 . = 0,  B3 = 0,  · · · · · · · ·

ℓ ℓ ℓ

voℓ

i.e,  B1 = , B2 = B3 = B4 = B5 = · · · · · · · · = 0. 

a

Substituting  these  values  in  (5),  we  get  the  required  solution. 

voℓ x at 

sin  . sin 

a ℓ ℓ

i.e,  y(x,t)  =

Example  2

A tightly  stretched string  with  fixed end points  x = 0 &  x = ℓ is  initially  at 

rest  in  its  equilibrium  position  . If  it  is  set  vibrating  by  giving  to  each  of  its  points  a

velocity 

y/ t =  kx(ℓ -x) at t = 0. Find the  displacement  y(x,t). 

Solution 

The  displacement  y(x,t)  is  given  by  the  equation 

# MSAJCE  92 iv. 

i.  y(0,t) =  0,  for  t  0. 

ii.  y(ℓ,t)  = 0,  for  t  0. 

iii.  y(x,0)  = 0, for 0  x  ℓ. 

 y

= kx(ℓ  – x) , for  0 x  ℓ. 

t t =  0

Since  the  vibration of  a string  is  periodic, therefore,  the solution  of  (1)  is  of  the  form 

y(x,t)  = (Acos x + Bsin x)(Ccos at  + Dsin at)  ------------(2) 

Using  (i)  in  (2)  , we  get 

0 = A(Ccos at  + Dsin at)  , for  all  t  0. 

which  gives  A = 0. 

Hence  equation  (2)  becomes 

y(x,t)  = B  sin x(Ccos at  + Dsin at)  ------------(3) 

Using  (ii)  in  (3),  we  get 

0 = Bsin ℓ(Ccos at +  Dsin at),  for  all  t  0. 

which  implies  ℓ = n.

n

Hence,   = , n being  an  integer. 

nx nat 

ℓ

nat 

Thus  , y(x,t)  = Bsin  Ccos  + Dsin  ------------------(4) 

ℓ ℓ ℓ

Using  (iii)  in  (4), we  get 

nx

0 = Bsin  . C

ℓ

Therefore,  C = 0 .

nx nat 

Hence,  y(x,t)  = Bsin  . Dsin 

ℓ ℓ

nx nat 

= B1sin  . sin  , where  B1= BD. 

ℓ ℓ

# MSAJCE  93 The  most  general  solution  is 



y(x,t)  =  Bn sin 

n=1 

nx nat 

sin  ----------------(5) 

ℓ ℓ

Differentiating  (5)  partially  w.r.t  t,  we  get 

 y nx nat  na

.cos  .

 t



=  Bn sin 

n=1  ℓ ℓ ℓ

Using  (iv),  we  get 



kx(ℓ -x)  = 

n=0 

na

Bn.

ℓ

. sin 

nx

ℓ

i.e, 

na

Bn .

ℓ

=

2

ℓ

ℓ nx

 f(x).  sin 

0 ℓ

dx 

2 nx

-cos  -sin 

2k  ℓ ℓ

i.e,  Bn =

ℓ

 f(x).  sin  dx 

na 0 ℓ

2 ℓ

 kx(ℓ  – x)  sin 

nx

= dx 

na 0 ℓ

nx

ℓ – cos 

2k   ℓ

=  (ℓx  – x2) d

na 0 nx

ℓ

nx nx

= (ℓx - x2) d - (ℓ -2x) 

na n

ℓ

n22

ℓ2

# MSAJCE  94 ℓ3 ℓ3

2k  2ℓ 3

= . {1  - cosn }

na n33

4 kℓ 3

i.e,  Bn = {1  – (-1) n}

n44 a

8kℓ 3

or  Bn = , if  n is  odd 

n44 a

Example  3

A tightly  stretched string  with  fixed end points  x = 0 &  x = ℓ is  initially  in  a

position  given  by  y(x,0)  = y0sin 3(x/ℓ).  If  it  is  released  from  rest  from  this  position,  find 

the  displacement  y at  any  time  and  at  any  distance  from  the  end  x = 0 .

Solution 

The  displacement  y(x,t)  is  given  by  the  equation 

2y 2 y

= a2

x2

-----------(1) 

t2

2k  -2cosn  2

= +

na n33 n33

0 , if  n is  even 

Substituting  in  (4),  we  get 



y(x,t)  = 

8kℓ 3

.

nat  nx

si n si n

ℓ ℓn44 an= 1,3,5,…… 

Therefore  the  solution  is 

8kℓ 3 



l (2n -1) at  (2n -1) x

y(x,t)  = sin  sin 

4 a n= 1 (2n -1) 4 ℓ ℓ

# MSAJCE  95 The  boundary  conditions  are 

(i)  y(0,t)  = 0,   t  0. 

(ii)  y(ℓ,t)  = 0,   t  0. 

(iii)  y

= 0, for  0 <  x < ℓ. 

t t =  0

(iv)  y(x,0)  = y0 sin 3(( x/ℓ),  for  0 < x < ℓ. 

The  suitable  solution  of  (1)  is  given  by 

y(x,t)  = (Acos x + Bsin x)(Ccos at  + Dsin at)  ------------(2) 

Using  (i) and  (ii)  in  (2)  , we  get 

n

A = 0 &  =

ℓ

nx nat  nat 

 y(x,t) =  B sin  (Ccos  + Dsin  ) -----------(3) 

ℓ ℓ ℓ

y nx nat  na nat  na

Now,  = B sin  - Csin  . + Dcos  .

t ℓ ℓ ℓ ℓ ℓ

Using  (iii)  in  the  above equation  , we  get 

nx na

0 = B sin  D

ℓ ℓ

Here,  B can  not  be  zero  . Therefore  D = 0. 

Hence  equation  (3)  becomes 

nx nat 

y(x,t)  = B sin  . Ccos 

ℓ ℓ

nx nat 

= B1sin  . cos  , where  B1 = BC 

ℓ ℓ

The  most  general  solution  is 

 nx nat 

# MSAJCE  96 y(x,t)  =  Bn sin 

n=1 

cos  ---------------- (4) 

ℓ ℓ

Using  (iv),  we  get 

n 

y0 sin 3 = 

ℓ n=1 

nx

Bnsin 

ℓ



i.e,   Bnsin 

n=1 

nx 3 x 1

= y0 sin 

ℓ 4 ℓ 4

3x

 sin 

ℓ

x 2x 3x

i.e,  B1sin  + B2 sin  +B 3 sin  + …. 

ℓ ℓ ℓ

3y 0 x y0 3x

= sin  - sin 

4 ℓ 4 ℓ

Equating  the  like  coefficients  on  both  sides,  we  get 

3y 0 -y0

, B 3 = , B2 = B4 = … =  0 . 

4

B1 =

4

Substituting  in  (4),  we  get 

3y 0 x at  y0 3x 3at 

y(x,t)  = sin  . cos  - sin  . cos 

4 ℓ ℓ 4 ℓ ℓ

2y

The  displacement  y(x,t)  is  given  by  the  equation 

2 y

-----------(1) = a2

x2

t2

The  boundary  conditions  are 

Example  4

A string  is  stretched  & fastened  to  two  points  x = 0 and  x = ℓ apart. 

Motion  is 

started  by  displacing  the  string  into  the  form  y(x,0)  = k(ℓx -x2) from  which  it  is 

released  at 

time  t = 0.  Find  the  displacement  y(x,t). 

Solution 

# MSAJCE  97 (i)  y(0,t)  = 0,   t  0. 

(ii)  y(ℓ,t)  = 0,   t  0. 

(iii)  y

= 0, for  0 <  x < ℓ. 

t t =  0

(iv)  y(x,0) =  k(ℓx  – x2), for  0 < x < ℓ. 

The  suitable  solution  of  (1)  is  given  by 

y(x,t)  = (Acos x + Bsin x)(Ccos at  + Dsin at)  ------------(2) 

Using  (i) and  (ii) in  (2)  , we  get 

n

.A = 0 &  =

nx nat 

ℓ

nat 

 y(x,t)  = B  sin  (Ccos  + Dsin  ) -----------(3) 

ℓ ℓ ℓ

y nx nat  na nat  na

Now,  = B sin  - Csin  . + Dcos  .

t ℓ ℓ ℓ ℓ ℓ

Using  (iii)  in  the  above equation  , we  get 

nx na

0 = B sin  D

ℓ ℓ

Here,  B can  not  be  zero 

D = 0

Hence  equation  (3)  becomes 

nx nat 

y(x,t)  = B sin  . Ccos 

ℓ

nx

ℓ

nat 

= B1sin  . cos  , where  B1 = BC 

ℓ ℓ

The  most  general  solution  is 

 nx nat 

y(x,t)  =  Bnsin  cos  ---------------- (4) 

# MSAJCE  98 n=1  ℓ ℓ

 nx

Using  (iv),  we  get  kx(ℓx  – x2) =  Bnsin  ---------------- (5) 

n=1  ℓ

The  RHS  of  (5)  is  the  half  range  Fourier  sine  series  of  the  LHS  function  .

2 ℓ

 Bn =  f(x) .  sin 

ℓ 

0

nx

dx 

ℓ

nx

-cos 

ℓ

n

ℓ

2k   (ℓx - x2) d

= 

ℓ 0

ℓ

nx ℓ

cos 

ℓ

+ (-2) 

n33

ℓ3 0

ℓ n33

ℓ3

n33

ℓ3

2k  2ℓ 3

= . {1 - cos  n}

ℓ n33

4kℓ 2

i.e,  Bn = {1 - (-1) n }

n33

2k  -2cos  n 2

= +

nx nx

-cos  -sin 

2k  ℓ ℓ

= (ℓx - x2) d - (ℓ -2x) 

ℓ n

ℓ

n22

ℓ2

# MSAJCE  99 or  Bn =

8kℓ 2

n33 , if n  is  odd 

0 , if  n is  even 

 8kℓ 2 nat  nx

y(x,t)  =  cos  .sin 

n=odd  n33 ℓ ℓ

8k   1 (2n -1) at  (2n -1) x

or  y(x,t)  =  cos  .sin 

3 n=1  (2n -1) 3 ℓ ℓ

Example  5

A uniform  elastic  string  of  length  2ℓ  is  fastened  at  both  ends.  The 

midpoint  of  the  string  is taken  to  the  height  „b‟  and  then  released  from  rest  in 

that  position  . Find  the  displacement  of  the  string. 

Solution 

The  displacement  y(x,t)  is  given  by  the  equation 

2y 2 y

= a2

x2

-----------(1) 

t2

The  suitable  solution  of  (1)  is  given  by 

y(x,t)  = (Acos x +  Bsin x)(Ccos at  + Dsin at)  ------------(2) 

The  boundary  conditions  are 

(i)  y(0,t)  = 0,   t  0. 

(ii)  y(ℓ,t)  = 0,   t  0. 

(iii)  y

= 0, for  0 <  x < 2ℓ. 

t t =  0

# MSAJCE  100 b

O(0,0)  ℓ B(2ℓ,0)  x

(b/ℓ)x  , 0<x<ℓ 

(iv)  y(x,0)  =

-(b/ℓ)(x -2ℓ),  ℓ<x<2ℓ 

[Since, equation  of OA is  y = (b/ℓ)x  and  equation  of AB is  (y -b)/(o -b)  = (x -ℓ)/(2ℓ -ℓ)] 

Using  conditions  (i)  and (ii)  in  (2),  we  get 

n

A = 0 &  =

nx nat 

2ℓ 

nat 

 y(x,t)  = B  sin  (Ccos  + Dsin  ) -----------(3) 

2ℓ  2ℓ  2ℓ 

y nx nat  na nat  na

Now,  = B sin  - Csin  . + Dcos  .

t 2ℓ  2ℓ  2ℓ  2ℓ  2ℓ 

Using  (iii)  in  the  above  equation  , we  get 

nx na

0 = B sin  D

2ℓ  2ℓ 

Here  B can  not  be  zero,  therefore  D = 0. 

Hence  equation  (3)  becomes 

nx nat 

y(x,t)  = B sin  . Ccos 

2ℓ 

nx

2ℓ 

nat 

# MSAJCE  101 = B1sin  . cos  , where  B1 = BC 

2ℓ  2ℓ 

The  most  general  solution  is 

 nx nat 

y(x,t)  =  Bnsin 

n=1 

cos  ---------------- (4) 

2ℓ  2ℓ 

Using  (iv),  We  get 

 nx

y(x,0)  =  Bn .sin  ---------------- (5) 

n=1  2ℓ 

The  RHS  of  equation  (5)  is  the  half  range Fourier  sine  series  of  the LHS  function  .

2 2ℓ  nx

 f(x) .  sin  dx  Bn =

2ℓ   2ℓ 

0

1 ℓ

 f(x) .  sin 



0

nx 2ℓ  nx

dx  +  f(x) .  sin  dx =

ℓ 2ℓ   2ℓ 

ℓ

ℓ 2ℓ  2ℓ 

ℓ

nx nx

ℓ -cos  2ℓ 

b  (x -2ℓ)  d

- 

ℓ ℓ

-cos 

1 b  2ℓ  ℓ

=  xd 

ℓ 0ℓ n

2ℓ 

n

2ℓ 

ℓ

nx nx

sin 

2ℓ 

cos 

1 b 2ℓ 

= ( x )  (1)  

ℓ ℓ n

2ℓ 

n22

4ℓ 2

0

ℓ b



 ℓ

0

2ℓ  -b

dx  + 

 ℓ

1 nx nx

= x sin  (x -2ℓ)  sin  dx 

# MSAJCE  102 n n n n

-ℓcos  sin  ℓcos  sin 

b 2 2 2 2

= + + +

ℓ2 n

2ℓ 

8b  sin  (n /2) 

n22

4ℓ 2 n

2ℓ 

n22

4ℓ 2

=

n22

2y

t2

2 y

= a2

x2

-----------(1) 

Example  6

A tightly  stretched string  with  fixed end  points  x = 0 &  x = ℓ is 

initially  in 

the  position  y(x,0)  = f(x). It  is  set  vibrating  by  giving  to  each  of  its  points  a

velocity 

y

= g(x)  at  t = 0 . Find  the  displacement  y(x,t)  in  the  form  of Fourier  series. 

t

Solution 

The  displacement  y(x,t)  is  given  by  the  equation 

Therefore  the  solution  is 

 nat  nx

y(x,t)  =  8bsin(n /2)  cos  sin 

n22

n=1  2ℓ  2ℓ 

# MSAJCE  103 The  boundary  conditions  are 

(i)  y(0,t)  = 0,   t  0. 

(ii)  y(ℓ,t)  = 0,   t  0. 

(iii)  y(x,0)  = f(x)  , for  0  x  ℓ. 

(iv)   u

= g(x) , for  0  x  ℓ. 

t t =  0

The  solution  of  equation  .(1)  is  given  by 

y(x,t)  = (Acos x + Bsin x)(Ccos at  + Dsin at)  ------------(2) 

where  A,  B,  C,  D are  constants. 

Applying  conditions  (i)  and  (ii)  in  (2),  we  have 

n

A = 0 and   = .

ℓ

Substituting  in  (2),  we  get 

nx nat  nat 

y(x,t)  = B  sin  (Ccos  + Dsin  )

ℓ

nx

ℓ

nat 

ℓ

nat 

y(x,t)  = sin  (B 1cos  + D1 sin  ) where  B1 = BC  and  D1 = BD. 

ℓ ℓ ℓ

The  most  general  solution.  is 



y(x,t)  =  Bn cos 

n=1 

nat  nat  nx

+ Dn .sin  .sin  --------------(3) 

ℓ ℓ ℓ

# MSAJCE  104 Using  (iii),  we  get 

 nx

f(x)  =  Bn .sin 

n=1  ℓ

---------------- (4) 

The  RHS  of  equation  (4)  is  the  Fourier  sine  series of  the  LHS  function. 

2 ℓ

 Bn =  f(x) .  sin 

ℓ 

0

nx

dx 

ℓ

Differentiating  (3)  partially  w.r.t  „t‟,  we  get 

y 

=  -Bn sin 

n=1 

nat  na

ℓ ℓ

nat  na nx

+ Dn .cos  .sin 

t ℓ ℓ ℓ

Using  condition (iv)  , we  get 



g(x)  =  Dn

n=1 

na nx

. sin  -----------------(5) 

ℓ ℓ

The  RHS  of  equation  (5)  is  the  Fourier  sine  series  of  the  LHS  function. 

nx

 Dn . = dx 

 Dn = dx 

na  ℓ

0

Substituting  the  values  of  Bn and  Dn in  (3),  we  get  the required  solution  of  the 

given  equation. 

Exercises 

(1)  Find  the  solution  of  the  equation  of  a vibrating  string of  length  „ℓ‟,  satisfying  the 

conditions 

y(0,t) =  y(ℓ,t) =  0 and  y = f(x),  y/ t = 0 at  t = 0. 

(2)  A taut  string  of  length  20  cms.  fastened  at  both  ends  is  displaced  from  its  position  of 

equilibrium,  by  imparting  to  each of its points  an  initial velocity  given  by 

na 2 ℓ

 g(x) .  sin 

ℓ ℓ 

0

ℓ

2 ℓ

 g(x)  . sin 

nx

# MSAJCE  105 v =  x in  0  x  10 

= 20   x in  10   x  20, 

„x‟  being  the  distance  from  one  end.  Determine  the  displacement  at  any  subsequent  time. 

(3)  Find  the  solution  of  the  wave  equation 

2u

t2

2u

= c2

x2

,

corresponding  to the  triangular  initial  deflection  f(x  ) = (2k / ℓ)  x when  0 x ℓ/ 2

= (2k / ℓ) (ℓ  – x)  when  ℓ/ 2 x ℓ, 

and initial velocity  zero. 

(4)  A tightly  stretched string  with  fixed end  points x  = 0 and  x = ℓ is  initially  at rest  in  its 

equilibrium  position.  If  it  is  set  vibrating  by  giving  to  each  of  its  points  a velocity  y/  t

= f(x) 

at  t =  0. Find  the  displacement  y(x,t). 

(5)  Solve  the  following  boundary  value problem of  vibration of  string 

i.  y(0,t)  = 0

ii.  y(ℓ,t)  = 0

y

iii.  (x,0)  = x (x  – ℓ),  0 x ℓ. 

u 2u

x2

= 2 ----------------(1). 

t

Let  u = X(x) .  T(t) be  the  solution of  (1), where  „X‟  is  a function of  „x‟  alone and  „T‟  is  a

function  of  „t‟  alone. 

t

iv.  y(x,0)  = x in  0 x ℓ/ 2

= ℓ – x in  ℓ/ 2 x ℓ. 

(6)  A tightly  stretched string  with  fixed end points  x = 0 and x  = ℓ is  initially  in  a

position  given  by  y(x,0) =  k(  sin( x/ ℓ)  – sin(  2x/ ℓ)).  If  it  is  released  from  rest,  find  the 

displacement of  „y‟  at any  distance  „x‟  from one  end at  any  time  „t‟. 

3.3  Solution  of  the  heat  equation 

The  heat  equation  is 

# MSAJCE  106 Substituting  these  in  (1), we  get 

X T′  = 2 X′′  T. 

X′′  T′ 

i.e,  = ---------------(2). 

X 2T

Now  the left  side  of (2)  is  a function  of  „x‟  alone and the  right  side  is  a function of  „t‟ 

alone. Since  „x‟  and  „t‟  are  independent variables,  (2)  can be  true  only  if  each side  is 

equal  to  a constant. 

X′′  T′ 

Therefore,  = = k (say). 

X 2T

Hence,  we  get  X′′   kX  = 0 and  T′   2 kT =  0.  --------------(3). 

Solving  equations  (3),  we  get 

(i)  when  „k‟  is  positive  and k =  2, say 

X = c1 ex + c2 e - x 

> 22

T = c3 e   t

(ii)  when  „k‟  is negative  and k  =  2, say 

X = c4 cos x + c5 sin  x 

> 22

T = c6 e    t

(iii)  when  „k‟  is  zero. 

X = c7 x + c8

T = c9

Thus  the  various  possible  solutions  of  the  heat  equation  (1)  are  

> 22

u = (c 1 ex + c2 e - x) c3 e   t -----------(4)  

> 22

u = (c 4 cos x + c5 sin  x) c 6 e    t ----------(5) 

u = (c 7 x + c8) c9 ------------(6) 

# MSAJCE  107 Let  the  equation  for  the  conduction  of  heat  be 

u 2u

--------- = 2 ---------- ------------- (1) 

t x2

The  boundary  conditions  are 

(i) 

(ii) 

(iii) 

u (0,t)  = 0,   t ≥  0

u (ℓ,t)  = 0,   t > 0

u (x,0) =  f (x),  0 <  x < ℓ

The  solution  of  equation  (1)  is  given  by  

> 22

u (x,t) =  (A cos x + B sin x)  e –  t --------------- (2) 

Of  these  three  solutions,  we  have  to  choose  that  solution  which  suits  the  physical 

nature  of the  problem and  the given boundary  conditions. As  we  are  dealing  with 

problems  on heat  flow, u(x,t)  must be  a transient  solution  such that  „u‟  is to  decrease  with 

the  increase  of  time  „t‟. 

Therefore,  the  solution given  by  (5),  

> 22

u = (c 4 cos x + c5 sin  x) c 6 e    t

is  the  only  suitable  solution  of  the  heat  equation. 

Illustrative  Examples 

Example  7

A rod  „ℓ‟  cm  with  insulated  lateral  surface  is  initially  at  temperature  f(x) at  an 

inner  point  of  distance  x cm  from  one  end.  If  both  the  ends  are  kept  at  zero  temperature, 

find  the temperature  at any  point of  the  rod  at any  subsequent  time. 

# MSAJCE  108  u (x,t) =  B sin x e –2  2t -------------- (3)  

> 22

Applying  condition  (ii)  in  the  above  equation,  we  get  0 = Bsin ℓ e - 

n

i.e,  ℓ =  n or   = --------- (n  is  an  integer) 

ℓ

-n222

Applying  condition  (i)  in  (2),  we  have 

> t

0 =  A.e  - 2 2 which  gives  A = 0

> t

------------- t

ℓ2

nx

 u (x,t) =  B sin  --------- e

ℓ

Thus  the  most  general  solution  is 

 nx

u (x,t) =   Bn sin  --------- e

-n222

------------- t

ℓ2 ------------- (4)  

> n=1

ℓ

By  condition  (iii), 

 nx

u (x,0) =   Bn sin  ----------- = f (x).  

> n=1

ℓ

The  LHS  series  is  the  half  range  Fourier  sine  series  of  the  RHS  function.  

> ℓ

nx

 f (x) sin  -------- dx 

2

 Bn = ------

ℓ

u 2u

The equation  for  the  conduction  of  heat  along  a bar  of length  ℓ is  ------ = 2 -------

t x2

--,

 f (x) sin  -------- dx 

nx

sin  --------- e

ℓ

-n222

------------ t

ℓ2

ℓ

 2

u (x,t) =   ------ 

> n=1

ℓ 0

Example  8 

> 0

ℓ

Substituting  in  (4),  we  get  the  temperature  function  

> ℓ

nx

# MSAJCE  109 neglecting  radiation . Find  an  expression  for  u,  if  the  ends  of  the  bar  are  maintained  at 

zero  temperature  and  if,  initially,  the  temperature  is  T at  the  centre  of  the  bar  and 

falls  uniformly  to 

zero  at  its  ends .

x P

A B

Let  u be  the  temperature  at  P,  at  a distance  x from  the  end  A at  time  t. 

u 2u

The  temperature  function u (x,t) is given by  the equation  ------ = 2 ---------, ----------(1) 

t x2

The  boundary  conditions  are 

(i)  u (0,t)  = 0,   t > 0. 

(ii)  u (ℓ,t)  = 0,   t > 0. 

2Tx  ℓ

u(x,0)  = ----------, for  0 < x < -----

ℓ 2

2T  ℓ

= ----------(ℓ  - x),  for  ----- < x < ℓ

ℓ 2

The  solution  of  (1)  is of  the  form  

> 22

u(x,0)  A(ℓ/2,T) 

T

B(ℓ,0) 

O(0,0)  L ℓ X

u (x,t) =  (A  cos x + B sin x) e  -  t ----------(2) 

Applying  conditions  (i)  and  (ii)  in  (2),  we  get 

# MSAJCE  110  u (x,t) =   Bn sin  --------- e

-n222

------------- t

ℓ2 ------------- (3)  

> n=1

ℓ

Thus  the  most  general  solution  is 

 nx

Using  condition  (iii)  in  (3),  we  have 

 nx

u (x,0) =   Bn sin  -------- --------------- (4)  

> n=1

ℓ

We  now expand  u (x,0)  given by  (iii) in a  half  – range  sine  series  in  (0,ℓ) 

> ℓ

2 nx

Here  Bn = ------  u (x,0) sin  -------- dx 

> 0

ℓ ℓ

2

ie,  Bn = ------

ℓ

2Tx  nxℓ/2  ℓ 2T  nx

 --------- sin  -------- dx  +  -------- (ℓ -x)  sin  -------- dx 

ℓ0 ℓ/2 

ℓ ℓ ℓ

nx

- cos  ---------

ℓ

nx

- cos  -----------

ℓ4T 

=

> ℓ/2

 x d

> ℓ

+ (ℓ -x)  d

ℓ2 0 n/ℓ  ℓ/2  n/ℓ 

nx

- cos  ---------

ℓ

nx

- sin  -----------

ℓ

ℓ/2 

4T 

= (x)  – (1)  +

ℓ2 n/ℓ  n22/ℓ 2

n

A = 0 &   = -------

ℓ

-n222

------------- t

ℓ2

nx

 u (x,t) =  B sin  --------- e

ℓ

o

# MSAJCE  111 -n222

------------- t

ℓ2

-n222

------------- t

-2 (2n -1) 22

----------------- t

ℓ2

- cos  ---------

ℓ

- sin  ----------

ℓ

ℓ

(ℓ  - x)  – (-1) 

n/ℓ  n22/ℓ 2

ℓ/2 

4T  - ℓ2 n ℓ2 n ℓ2 n ℓ2 n

= cos  + sin  + cos  + sin 

ℓ2 2n  2 n22 2 2n  2 n22 2

4T  2ℓ 2 n

= sin 

ℓ2 n22 2

8T  n

Bn = sin 

n22 2

Hence  the  solution  is  

> 

8T  n nx

u (x,t) =   ---------- sin  -------- sin  --------- e 

> n=1

n22 2 ℓ

or  

> 

8T  n nx

u (x,t) =   ---------- sin  -------- sin  --------- e ℓ2 

> n=1,3,5…

n22 2 ℓ

or 

8T  (-1)  n+1  (2n -1) x

u (x,t)  =

> 



2 n=1 

sin  e

(2n -1) 2 ℓ

Steady  - state  conditions  and  zero  boundary  conditions 

Example  9

A rod  of  length  „ℓ‟  has  its  ends  A and  B kept  at  0C and  100 C until  steady  state 

conditions  prevails.  If  the  temperature  at  B is  reduced  suddenly  to  0C and  kept  so  while 

that  of  A is maintained,  find the  temperature  u(x,t)  at a  distance  x from A and at  time 

„t‟. 

The  heat -equation  is  given  by 

# MSAJCE  112 u (x,t)  = (A cos  x + B sin  x)  e -22 t

Using,  conditions  (i)  and (ii)  in  (3),  we  get 

n

A = 0 &   = --------

ℓ

-n222

u 2u

--------- = 2 -------- ------------- (1) 

t x2

Prior  to  the  temperature  change  at  the  end  B,  when  t = 0,  the  heat  flow  was 

independent  of  time  (steady  state  condition). 

When  the  temperature  u depends  only  on  x, equation(1)  reduces  to 

2u

= 0

x2

Its general  solution  is  u = ax  + b ------------- (2) 

100 

Since  u =  0 for  x = 0 &  u = 100 for  x = ℓ, therefore  (2)  gives  b = 0 & a  = ---------

ℓ

100 

u (x,0) =  ------- x,  for  0 <  x < ℓ

ℓ

Hence  the  boundary  conditions  are 

(i)  u (0,t) 

(ii) u  (ℓ,t) 

= 0, 

= 0, 

100x 

 t  0

 t  0

(iii)  u (x,0)  = ----------- , for  0 < x < ℓ

ℓ

The  solution  of  (1)  is of  the  form 

--------------- (3) 

------------- t

ℓ2

nx

 u (x,t) =  B sin  --------- e

ℓ

Thus  the  most  general  solution  is 

-n222

# MSAJCE  113  nx ------------- t

ℓ2

 u (x,t) =   Bn sin  --------- e ------------- (4)  

> n=1

ℓ

Applying  (iii)  in  (4),  we  get  

> 

nx

u (x,0) =   Bn sin  --------- 

> n=1

ℓ

> 

100x  nx

ie,  ------- =  Bn sin  ---------

> n=1

ℓ ℓ

2 ℓ 100x  nx

==>  Bn = -----  -------- sin  ------- dx 

ℓ 0 ℓ ℓ

nx

- cos 

ℓ

= -

ℓ2

200  ℓ

 x d

0 n

ℓ

ℓ

ℓ ℓ2 0

200  –ℓ2

= --------- ------- cos  n

nℓ2

200  (-1)  n+1 

Bn =

n

Hence  the  solution  is 

nx

- cos  ----------

ℓ

nx

- sin  ----------

ℓ200 

= (x)  – (1) 

ℓ2 n n22

# MSAJCE  114  200  (-1)  n+1  nx

sin  ----------

ℓ

-n222 t

u (x,t)  =  -------------- e ℓ2 

> n=1

n

Example  10 

A rod,  30  c.m  long,  has  its  ends  A and  B kept  at  20 C and  80 C respectively,  until 

steady  state  conditions  prevail.  The  temperature  at  each  end is  then  suddenly  reduced  to 

0C and  kept  so.  Find  the  resulting  temperature  function  u (x,t) taking  x = 0 at  A. 

The  one  dimensional  heat  flow  equation  is  given  by 

u 2u

= 2

x2

(1) 

t

u

In  steady -state,  ------ = 0. 

t

2u

Now,  equation  (1) reduces  to  --------- = 0

x2

------------- (2) 

Solving  (2),  we  get  u = ax  + b ------------- (3) 

The  initial  conditions,  in  steady  – state,  are 

u = 20,  when  x =  0

u = 80,  when  x =  30 

Therefore,  (3) gives  b =  20,  a = 2. 

u (x) =  2x  + 20  ------------- (4) 

Hence  the  boundary  conditions  are 

(i) 

(ii) 

(iii) 

u (0,t)  = 0,   t > 0

u (30,t) =  0,   t > 0

u (x,0)  = 2x  + 20, for  0 <  x < 30 

The  solution  of  equation  (1)  is  given  by  

> 22

u (x,t) =  (A cos  x + Bsin x) e  -  t ----------------- (5) 

Applying  conditions  (i)  and  (ii),  we  get 

# MSAJCE  115 n

A = 0,   = --------, where  „n‟  is an  integer 

30 

-2n22

nx---------- t

900 

-2n22

nx ----------- t

 u (x,t) =  B sin  --- ---- 900 

(6) 

30 

The  most  general  solution  is 

> 

 u (x,t) =   Bn sin 

n=1  e -----

30 

------------- (7) 

Applying  (iii)  in  (7),  we  get  

> 

nx

u (x,0)  =  Bn sin  ------- = 2x  +20, 0 <  x < 30.  

> n=1

30 

> 30

2 nx

 Bn = -----  (2x  + 20)  sin  ------- dx 

> 0

30  30 

nx

- cos 

1 30 

=

> 30

 (2x+ 20)  d

15  0 n

30 

1

e

= (2x+20)  – (2) 

15  n n22

30 

nx

- cos  ----------

30 

900 

nx

- sin  ------

30 

0

30 

# MSAJCE  116 900 

-2n22

n-x---------- t

1 –2400  cosn  600 

= +

15  n

40 

Bn = ------- {1  – 4 ( - 1) n }

n

n

Hence,  the  required  solution  is 

 40 

u (x,t)  =  ------- {1  – 4 ( -1) n } sin  ---e

n=1  n

----

30 

Steady –state  conditions  and  non –zero  boundary  conditions 

Example  11 

The  ends A  and  B of  a rod 30cm.  long  have  their  temperatures  kept at  20 C and 

80 C,  until  steady –state  conditions  prevail.  The  temperature  of  the  end  B is  suddenly 

reduced  to  60 C and  kept  so  while  the  end A  is  raised  to 40 C.  Find  the  temperature 

distribution  in  the  rod  after  time  t. 

Let  the equation for  the  heat - flow  be 

u 2u

------- = 2 ---------

t x2

----------- (1) 

2u

In  steady –state,  equation  (1)  reduces  to  -------- = 0. 

x2

Solving,  we  get  u = ax  + b -------------- (2) 

The  initial  conditions,  in  steady –state,  are 

u =  20, 

u =  80, 

when  x = 0

when  x = 30 

From  (2),  b = 20  & a = 2. 

Thus  the  temperature  function  in  steady –state  is 

# MSAJCE  117 u (x) =  2x  + 20  -------------- (3) 

Hence  the  boundary  conditions  in the  transient –state  are 

(i) 

(ii) 

(iii) 

u (0,t)  = 40,   t >  0

u (30,t) =  60,   t >  0

u (x,0)  = 2x  + 20, for  0 <  x < 30 

we  break  up  the  required  funciton  u (x,t)  into  two  parts  and  write 

u (x,t) =  us (x) +  ut (x,t)  --------------- (4) 

where  us (x)  is  a solution  of  (1),  involving  x only  and  satisfying  the  boundary 

condition  (i)  and (ii).  ut (x,t)  is then  a function  defined  by  (4)  satisfying  (1). 

Thus  us(x)  is  a steady  state  solution  of  (1)  and  ut(x,t)  may  therefore  be  regarded 

as  a transient  solution  which  decreases  with  increase  of  t. 

To  find  us(x) 

2u

we  have  to  solve the equation  --------- = 0

x2

Solving,  we  get  us(x)  = ax  + b ------------- (5) 

Here  us(0)  = 40,  us(30)  = 60. 

Using  the above  conditions,  we  get  b = 40, a  = 2/3. 

2

us(x)  = ------ x + 40 

3

To  find  ut(x,t) 

ut ( x,t) =  u (x,t)  – us (x) 

-------------- (6) 

Now  putting  x = 0 and  x = 30  in  (4), we  have 

ut (0,t)  = u (0,t)  – us (0)  = 40 –40 =  0

and  ut (30,t)  = u (30,t)  – us (30)  = 60 –60 =  0

Also  ut (x,0)  = u (x,0)  – us (x) 

2

= 2x  + 20  – ------ x– 40 

3

4

= ------- x – 20 

3

# MSAJCE  118 t

900 

-2n22

nx

-2n22

----------- t

900 

Hence  the  boundary  conditions  relative to the  transient solution u t (x,t)  are 

ut (0,t)  = 0

ut (30,t)  = 0

--------------(iv) 

--------------(v) 

and  ut (x,0)  = (4/3)  x – 20  -------------(vi) 

We  have 

ut(x,t)  = (Acos x +

-22t

e Bsin x) 

(7) 

Using  condition  (iv)  and (v)  in  (7),  we  get 

n

A = 0 &   = ---------

30 

Hence  equation  (7)  becomes 

ut (x,t)  = B sin  ----e ----

30 

The  most  general  solution  of  (1)  is  

> 

nx

(8) 

ut(x,t)  =  Bnsin  ---- e --- 

> n=1

30 

Using  condition  (vi)  , 

> 

nx

ut (x,0)  =  Bn sin  ------- = (4/3)  x–20, 0 <  x < 30.  

> n=1

30 

> 30

2 nx

 Bn = -----  {(4/3) x –20}  sin  -------- dx 

> 0

30  30 

# MSAJCE  119 -2n22

- t

nx 900 

sin  -- e ----

30 

-2n22

n-x---------- t

----- 900 

30 

nx

- cos 

1 430 



30 

= x–20  d

15  0 3 n

30 

1

15 

–600  cosn 

n

– 40 

= ------- {1 +  cos n  }

n

– 40 { 1 +  (-1) n }

Bn  =

n

or  Bn = 0 , when n  is  odd 

-80 

-------, when  n is  even 

n

> 

ut (x,t)  = 

-80 

-------

> n=2,4,6

, . . . n

600 

n

1 4 4

= x–20  –

15  3 n

--------

30 

3 n22

--------

900 

= –

nx

- cos  ----------

30 

nx

- sin  ----------

30 

 u (x,t) =  us (x) +  ut (x,t) 

2 80  

ie, u (x,t) =  ------x + 40  – ------ 

1

----- sin  -- e

3 n=2,4,6,..  n

# MSAJCE  120 Exercises 

(1)  Solve  u/ t = 2 (2u / x2) subject  to  the  boundary  conditions  u(0,t)  = 0, 

u(l,t)  = 0,  u(x,0)  = x,  0 x l. 

(2)  Find  the  solution  to  the  equation  u/ t =  2 (2u / x2) that  satisfies  the  conditions 

i.  u(0,t)  = 0, 

ii.  u(l,t)  = 0,   t  0, 

iii.  u(x,0)  = x for  0 x l/ 2. 

= l – x for  l/ 2 x l. 

(3)  Solve  the  equation  u/ t = 2 (2u / x2) subject  to  the  boundary  conditions 

i.  u(0,t)  = 0, 

ii.  u(l,t)  = 0,   t  0, 

iii.  u(x,0)  = kx(l  – x),  k  0,  0  x  l. 

(4)  A rod  of  length  „l‟  has  its  ends  A and  B kept  at  0o C and  120 o C respectively  until 

steady  state  conditions  prevail.  If  the  temperature at  Bis  reduced  to  0o C and  kept  so  while 

that  of  A is  maintained,  find  the  temperature  distribution  in  the  rod. 

(5 ) A rod of  length  „l‟  has  its  ends  A and  B kept  at  0o C and 120 o C respectively  until 

steady  state  conditions  prevail.  If  the  temperature at  Bis  reduced  to  0o C and  kept  so  while 

10 o C and  at  the  same  instant  that at  A is  suddenly  raised to  50 o C.  Find the  temperature 

distribution  in  the  rod  after  time  „t‟. 

(6) A rod  of  length  „l‟  has  its  ends  A and  B kept  at  0o C and  100 o C respectively  until 

steady  state  conditions  prevail . If  the  temperature  of  A is  suddenly  raised  to  50 o C and 

that  of  B to 

150 o C,  find  the  temperature  distribution  at  the  point  of  the  rod  and  at  any  time .

(7)  A rod  of  length  10  cm.  has  the  ends  A and  B kept  at  temperatures  30 o C and  100 o C, 

respectively  until  the  steady  state  conditions  prevail.  After  some  time,  the  temperature  at 

A is  lowered  to  20 o C and  that  of  B to  40 o C,  and  then  these  temperatures  are  maintained. 

Find  the  subsequent  temperature  distribution. 

(8) The  two  ends  A and  B of  a rod  of  length  20  cm . have  the  temperature  at  30 o C and 

80 o C respectively  until  th  steady  state  conditions  prevail . Then  the  temperatures  at  the 

ends  A and  B are  changed  to  40 o C and  60 o C respectively . Find  u(x,t) .

(9)  A bar  100  cm.  long,  with insulated  sides  has  its  ends  kept  at  0o C and  100 o C until 

steady  state  condition  prevail.  The  two  ends  are  then  suddenly  insulated  and  kept  so.  Find 

the  temperature  distribution 

# MSAJCE  121 (10)  Solve  the  equation  u/ t = 2 (2u / x2) subject  to  the  conditions  (i)  „u‟  is  not 

infinite 

as  t   (ii) u  = 0 for  x = 0 and x  = ,  t (iii)  u =  x  x2 for  t = 0  in (0,  ). 

3.4  Solution  of Laplace’s equation(Two  dimentional  heat  equation) 

The  Laplace  equation  is 

 2 u  2 u

x2

+ = 0

y2

Let  u = X(x)  . Y(y)  be  the  solution  of  (1),  where  „X‟  is a  function of  „x‟  alone and  „Y‟  is 

a function of  „y‟  alone. 

2u

x2

2u

y2

Then  = X′′  Y and  = . X  Y′′ 

Substituting  in  (1),  we  have 

X′′  Y + X Y′′  = 0

X′′  Y′′ 

i.e,  =  ---------------(2). 

X Y

Now  the  left side  of (2)  is  a function of  „x‟  alone and  the right  side  is a  function  of 

„t‟  alone.  Since  „x‟  and  „t‟  are  independent variables,  (2)  can  be  true  only  if  each side 

is  equal  to  a constant. 

X′′  Y′′ 

Therefore,  =  = k (say). 

X Y

Hence,  we get  X′′   kX  = 0 and  Y′′  + kY  = 0.  --------------(3). 

Solving  equations  (3),  we  get 

(i)  when  „k‟  is positive  and k =  2, say 

X = c1 ex + c2 e - x

Y =  c3 cos y + c4 sin  y

(ii)  when  „k‟  is negative  and k  =  2, say 

X = c5 cos x + c6 sin  x

Y = c7 ey + c8 e - y

# MSAJCE  122 (iii)  when  „k‟  is  zero. 

X = c9 x + c10 

Y = c11  x + c12 

Thus  the  various  possible  solutions  of  (1)  are 

u = (c 1 ex + c2 e - x) (c 3 cos y + c4 sin  y)  ------------(4) 

u = (c 5 cos x + c6 sin  x) (c 7 ey + c8 e - y) ----------(5) 

u = (c 9 x + c10 ) (c 11  x + c12 ) ------------(6) 

Of  these  three  solutions,  we  have  to  choose that  solution  which  suits  the  physical 

nature  of the  problem and the given boundary  conditions. 

Example  12 

An  infinitely  long  uniform plate is bounded by  two parallel edges  x = 0 & x  = ℓ

and  an  end  at  right  angles  to  them.  The  breadth  of this  edge  y = 0 is  ℓ and  this  edge  is 

maintained  at  a temperature  f (x).  All  the other  3 edges  are  at  temperature  zero.  Find  the 

steady  state temperature  at any  interior  point of the  plate. 

Solution 

Let u  (x,y) be  the temperature  at any  point x,y  of the  plate. 

2u 2u

Also  u (x,y)  satisfies  the equation  -------- + --------- = 0 ---------- (1) 

x2 y2

Let  the  solution  of  equation  (1)  be 

u(x,y)  = (A  cos  x +  B sin x)  (Ce y + De –y) ------------ (2) 

Y y = 

x = 0 x = ℓ

0 <  x < ℓ

0 <  y < 

ℓ

0 y = 0

f (x) 

X

The  boundary  conditions  are 

(i)  u (0,  y)  = 0, 

(ii)  u (ℓ, y) =  0, 

(iii)  u (x,  ) = 0, 

(iv)  u (x,  0)  = f(x), 

for  0 < y < 

for  0 < y < 

for  0 < x < ℓ

for  0 < x < ℓ

# MSAJCE  123 Using  condition  (i),  we  get 

0 = A (Ce y + De -y)

i.e,  A = 0

 Equation  (2)  becomes, 

u (x,y)  = B sin x ( Ce y + De  -y) ------------------- (3) 

Using  cndition  (ii),  we  get 

n

 =

ℓ

nx (n y/ℓ  ) (-ny/ℓ) 

u (x,y) =  B sin  --------- { Ce  + De 

ℓ

Therefore,  } ----------------- (4) 

Using  condition  (iii),  we get  C = 0. 

(- ny/ℓ) nx

u (x,y)  = B sin  -------- De 

ℓ

(- ny/ℓ) 

, where  B1 = BD. 

nx

i.e,  u (x,y)  = B1 sin  -------- e

ℓ

The  most  general  solution  is 

 nx (- ny/ℓ) 

u (x,y)  =  Bn Sin  ------- e

n =1  ℓ

-------------- (5) 

Using  condition  (iv),  we  get 

 nx

f (x)  =  Bn Sin  ----------- --------------- (6) 

n=1  ℓ

The  RHS  of  equation  (6)  is  a half  – range  Fourier  sine  series  of  the  LHS  function. 

2 ℓ nx

-------------- (7) Bn  = --------  f (x). Sin  -------- dx 

ℓ 0 ℓ

# MSAJCE  124 Using  (7)  in  (5),  we get  the  required  solution. 

Example  13 

A rectangular  plate  with  an  insulated  surface  is  8 cm.  wide  and  so  long  compared 

to  its  width  that  it  may  be considered  as  an  infinite plate.  If  the  temperature along  short 

edge  y = 0 is  u(x,0) =  100 sin ( x/8),  0 < x < 8, while two long  edges  x = 0 &  x = 8 as 

well  as  the  other  short  edges  are  kept at  0C.  Find  the  steady  state  temperature  at  any 

point of the  plate. 

Solution 

The  two  dimensional  heat  equation  is  given  by 

2u 2u

--------- + ---------- = 0 -------------- (1) 

x2 y2

The  solution  of  equation  (1)  be 

u (x,y) =  (A cos x + B sin x)  (Ce y + De -y) ----------------- (2) 

The  boundary  conditions  are 

(i)  u (0,  y)  = 0, 

(ii)  u (8,  y)  = 0, 

(iii)  u (x,  ) = 0, 

for  0 < y < 

for  0 < y < 

for  0 < x < 8

(iv)  u (x,  0)  = 100  Sin  (x/8,)  for  0 < x < 8

Using  conditions  (i),  & (ii),  we  get 

n

A = 0 ,  --------

8

nx (n y / 8)  (-ny / 8) 

Ce  + De u (x,y)  = B sin  --------

8

(n y / 8) 

= B1e

(-ny / 8) 

+ D1e

nx

sin  ----------, where  B1 = BC 

8 D1 = BD 

The  most  general  soln  is 

 (n y / 8)  (-ny / 8) 

+ Dne

nx

sin  ----------

8

u (x,y)  =  Bne

n=1 

-------------- (3) 

Using  condition  (iii),  we  get  Bn = 0. 

# MSAJCE  125  (- ny / 8)  nx

sin  ----------

8

Hence,  u (x,y)  =  Dne

n=1 

--------------- (4) 

Using  condition  (iv),  we  get 

x  nx

sin  ---------

8

100  sin  --------- =  Dn

8 n=1 

+ = 0 (1) 

x2 y2

The  solution  is 

x x 2x 3x

i.e,  100  sin  --------- = D1 sin  ------- + D2 sin  -------- + D3 sin  --------- + . .  . . .

8 8 8 8

Comparing  like  coefficients  on  both  sides,  we  get 

D1 = 100, D 2 = D3 = . . .  . = 0

Substituting  in  (4),  we  get 

(-y / 8) 

u (x,y) =  100  e sin  (x /  8) 

Example  14 

A rectangular  plate  with  an  insulated  surface  10  c.m  wide  & so  long  compared  to 

its  width  that  it  may  considered  as  an  infinite  plate.  If  the  temperature  at  the  short  edge  y

= 0 is  given  by 

u (x,0)  = 20  x,  0 < x < 5

20  (10 -x),  5 < x < 10 

and  all  the  other 3  edges  are  kept  at  temperature  0C.  Find  the  steady  state temperature  at 

any  point of the  plate. 

Solution 

The  temperature  function  u (x,y) is given  by  the  equation 

2u 2u 

> y-y

u (x,y)  = (A cos x + B sin x)  (Ce  + De  ) ---------------- (2) 

# MSAJCE  126 The  boundary  conditions  are 

(i)  u (0,  y)  = 0, 

(ii)  u (10, y)  = 0, 

(iii)  u (x,  ) = 0, 

(iv)  u (x,  0)  = 20  x, 

20  (10 -x), 

Using  conditions  (i),  (ii),  we  get 

n

A =  0 &   = ---------

10 

Equation  (2)  becomes 

for  0 < y < 

for  0 < y < 

for  0 < x < 10 

if  0 < x < 5

if  5 < x < 10 

(n y / 10) nx

u (x,y)  = B  sin  ------ Ce 

10 

(- ny/10) 

+ De 

(n y / 10) 

= B1e

(- ny/10)  nx

sin  ---------

10 

where  B1 = BC, 

D1 = BD + D1e

The  most  general  solution  is 

 (n y / 10)  (- ny/10)  nx

sin  ---------

10 

u (x,y)  =  Bne + Dne

n =1 

Using  condition  (iii),  we  get  Bn= 0. 

------------ (3) 

 Equation  (3)  becomes 

(- ny/10) 

u (x,y)  =  Dne

n =1 

nx

sin  ---------

10 

------------ (4) 

Using  condition  (iv),  we  get 

# MSAJCE  127 

u (x,0) =  

n =1 

nx

sin  ---------

10 

Dn.  ------------ (5) 

The  RHS  of  equation  (5)  is  a half  range  Fourier  sine  series  of  the  LHS  function 

> 10

2 nx

Dn  = --------  f (x)  sin  -------- dx 

> 0

10  10 

2

= (20x)  – (20) 

10  n n22

10 

nx

- cos  ---1--0-----

100  0

10 

n

800  sin  --------

2

i.e,  Dn =

n22

Substituting  in  (4)  we  get, 

n

> 

800  sin  --------

2 (-ny / 10)  nx

sin  ----------

10 

u (x,y)  =  ------------------------- e  

> n=1

n22

Example  15 

A rectangular plate  is bounded  by  the  lines  x = 0, x  = a,  y = 0 & y = b. 

The  edge  temperatures  are  u (0,y) =  0, u  (x,b) =  0, u  (a,y) =  0 &

nx

- sin  ---1--0-----

nx

- cos  ----------

10 

nx

- sin  ----------

10 

5

+ [20  (10 –x)]  - – (-20) 

n n22

10  100  5

# MSAJCE  128 u (x,0)  = 5 sin  (5 x / a)  + 3  sin  (3 x / a).  Find  the steady  state  temperature  distribution  at 

any  point of the  plate. 

The  temperature  function  u (x,y)  satisfies  the  equation 

2u 2u

---------- +

x2

------------ = 0

y2

---------- (1) 

Let  the  solution  of  equation  (1)  be 

u (x,y)  = (A  cos x + Bsin x)  (Ce y + De  - y) ------------ (2) 

The  boundary  conditions  are 

(i)  u (0,y)  = 0, 

(ii)  u (a,y)  = 0, 

(iii)  u (x,  b)  = 0, 

for  0 < y < b

for  0 < y < b

for  0 < x < a

(iv)  u (x,0)  = 5 sin  (5 x / a)  + 3 sin  (3 x / a),  for  0 < x < a. 

y y = b

x = 0 x = a

O y =0 

Using  conditions  (i),  (ii),  we  get 

n

A =  0,   = ---------

a

nx (n y / a) 

u (x,y)  = B sin  -------- Ce 

a

x

(-ny / a) 

+ De 

(n y / a) 

B1e

(-ny / a) 

+ D1e

nx

= sin  --------

a

The  most  general  solution  is  

> 

(n y / a)  (-ny / a) 

+ Dne

nx

sin  -----------

a

u (x,y)  =  Bne

n=1 

-------(3) 

# MSAJCE  129 nx

sin  -----------

a

(n b / a)  (-nb / a) 

==>  Bne + Dne = 0

e (n b /  a) 

 Dn = Bn ---------------- = - Bne(2n b /  a) 

-e (-nb /  a) 

Substituting  in  (3),  we  get  

> 

nx

sin  -------------

a

Bne (n y / a)  - Bne (2n b / a)  e (-ny / a) 

u (x,y)  =  

> n=1
> 

Bn nx

sin  -------

a

=  ----------- e(n y / a)  e(-nb / a)   e (2n b / a)  e (-ny / a)  e(-nb / a)  

> n=1

e(-nb)/a 

2 Bn e(n  (y -b) /  a)  - e(-n (y -b) /  a)  nx

=  sin 

e(-nb / a)  2 a

2B n n (y –b)  nx

=  sin  h sin 

e(-nb / a)  a a 

> 

n (y  –b)  nx

sin  ------

a

i.e,  u (x,y) =   Cn sin h  ---------- ----------- (4)  

> n=1

a

> 

Using  condition  (iv),  we  get 

5x 3x n (-b)  nx

5 sin  -------- + 3 sin  --------- =  Cn sin  h ------- sin  ------

> n=1

a a a a

Using  condition  (iii)  we  get  

> 

(n b / a)  (-nb / a) 

0 =  Bne

> n=1

+ Dne

5x 3x  nb nx

ie,  5 sin  -------- + 3 sin  --------- =  - Cn sin h  ------ sin  -------

a a n=1  a a

# MSAJCE  130 5x 3x b x 2b 2x

ie,  5 sin  ------ + 3 sin  ------- = - C1 sinh  ------ sin  ------ - C2 sin  h------ sin  ------ - …

a a a a a a

Comparing  the  like  coefficients  on  both  sides,  we  get 

3b

- C3 sinh  ------------ = 3 &

a

5b

- C5 sinh  ------------ = 5, 

a

C1 = C2 = C4 = C6 = . .  . =  0

- 3 -5

==>  C3 = & C5 =

sinh  (3 b /a)  sinh(5 b/  a )

Substituting  in  (4),  we  get 

3 3 (y -b)  3x

u (x,y)  = - sin  h sin 

sinh(3 b / a)  a a

3 3 (b -y) 

------------- sin  h -----------

sinh(3 b / a)  a

3x

sin  ----------

a

i.e,  u (x,y)  =

5 5 (b -y)  5x

+ sin  h sin 

sinh(5 b / a)  a a

Exercises 

2u 2u

(1)  Solve  the  Laplace  equation  + = 0 , subject to the  conditions 

x2 y2

i.  u(0,y)  = 0 for 0   y  b

5 5 (y -b)  5x

 sin  h sin 

sinh(5 b / a)  a a

# MSAJCE  131 ii.  u(a,y)  = 0 for  0  y  b

iii.  u(x,b) =  0 for  0  x  a

iv.  u(x,0)  = sin 3(x/ a)  ,0   x  a. 

(2)  Find  the  steady  temperature  distribution  at  points  in  a rectangular  plate with  insulated 

faces  and the edges  of the  plate  being  the lines x =  0, x  = a,  y = 0 and  y = b. When  three 

of  the  edges  are  kept  at temperature  zero and  the  fourth at  a fixed  temperature  o C. 

2u 2u

(3)  Solve  the  Laplace  equation  + = 0 , which  satisfies  the  conditions 

x2 y2

u(0,y)  = u(l,y)  = u(x,0)  = 0 and  u(x,a)  = sin(n x/ l). 

2u 2u

(4)  Solve  the  Laplace  equation  + = 0 , which  satisfies  the  conditions 

x2 y2

u(0,y)  = u(a,y)  = u(x,b)  = 0 and  u(x,0)  = x (a  – x ). 

2u 2u

(5)  Solve  the  Laplace  equation  + = 0 , subject to the  conditions 

x2 y2

ii.  u(l,y) =  0, 0   y  l

iv.  u(x,l) =  f(x),  0  x  l

i.  u(0,y)  = 0,  0  y  l

iii.  u(x,0) =  0, 0   x  l

(6)  A square  plate  is bounded  by  the  lines  x = 0,  y = 0,  x = 20 and  y = 20.  Its  faces  are 

insulated. 

The  temperature  along  the  upper horizontal edge  is given by  u(x,0) =  x (20  – x), when 0  

x 20, 

while  other  three  edges are  kept  at  0o C. Find  the  steady  state  temperature  in  the  plate. 

(7)  An  infinite  long  plate  is bounded  plate  by  two  parallel  edges and  an  end  at  right 

angles  to  them.The  breadth  is  . This end  is  maintained  at  a constant  temperature  „u 0‟ at 

all  points  and  the  other  edges are  at  zero  temperature.  Find  the  steady  state temperature  at 

any  point (x,y)  of the  plate. 

(8)  An  infinitely  long  uniform plate  is bounded  by  two  parallel  edges x  = 0 and x  = l,  and 

an  end  at right  angles to  them. The  breadth of  this edge  y = 0 is  „l‟  and  is maintained  at  a

temperature  f(x).  All  the  other  three edges  are  at  temperature  zero.  Find  the  steady  state 

temperature  at any  interior  point of the  plate. 

(9)  A rectangular  plate with  insulated  surface  is  8 cm.  wide  and  so  long  compared  to  its 

width  that  it  may  be  considered  infinite  in  length  without  introducing  an  appreciable 

error. If  the  temperature  along  one  short  edge y  = 0 is  given  by  u(x,0)  = 100  sin( x/ 8),  0

 x  8,  while  the  two  long  edges  x = 0 and  x = 8 as  well  as the  other  short  edge  are  kept 

at  0o C,  show that  the  steady  state  temperature at  any  point of  the  plane  is  given by  u(x,y) 

= 100  e-y/ 8 sin  x/ 8 .

# MSAJCE  132 (10)  A rectangular  plate  with  insulated  surface  is  10  cm.  wide  and  so  long  compared  to 

its  width  that it may  be considered infinite  length.  If the  temperature along  short edge  y =

0 is  given 

u(x,0)  = 8 sin( x/ 10)  when  0  x  10,  while  the  two  long  edges  x =  0 and  x =  10  as 

well  as the  other  short  edge are  kept at  0o C, find  the  steady  state  temperature  distribution 

u(x,y). 

# MSAJCE  133 UNIT -IV 

## FOURIER  TRANSFORMS 

4.1 Introduction 

This  unit  starts  with  integral  transforms  and  presents  three  well -known  integral 

transforms,  namely,  Complex  Fourier  transform,  Fourier  sine  transform,  Fourier  cosine 

transform  and  their  inverse  transforms . The  concept  of  Fourier  transforms  will  be 

introduced  after  deriving  the  Fourier  Integral  Theorem . The  various  properties  of  these 

transforms  and  many  solved  examples  are  provided  in  this  chapter . Moreover,  the 

applications  of  Fourier  Transforms  in  partial  differential  equations  are  many  and  are  not 

included  here  because  it  is  a wide  area  and  beyond  the  scope  of  the  book .

4.2 Integral  Transforms 

> ~

The  integral  transform  f(s)  of  a function  f(x)  is  defined  by  

> ~b

f(s)  =  f(x)  K(s,x)  dx, 

a

if  the  integral  exists  and  is  denoted  by  I{f(x)}.  Here,  K(s,x)  is  called  the  kernel  of  the 

transform.  The  kernel  is  a known function  of  „s‟  and  „x‟.  The  function  f(x) is  called  the 

inverse  transform 

> ~

of  f(s).  By  properly  selecting  the  kernel in  the  definition  of  general  integral  transform, 

we  get  various  integral  transforms. 

The  following are  some  of the  well -known  transforms: 

(i)  Laplace  Transform 

L{f(x)}  =  f(x)  e – sx  dx 

> 0

(ii)  Fourier  Transform 

1 

 f(x)  eisx  dx 

> -

F{f(x)}  =

2

(iii)  Mellin  Transform 

> 

M{f(x)}  =  f(x)  x s-1 dx 

> 0

# MSAJCE  134 (iv)  Hankel  Transform 

> 

Hn{f(x)}  =  f(x)  x Jn(sx)  dx, 

> 0

where  Jn(sx)  is  the  Bessel  function  of  the  first  kind  and  order  „n‟. 

1 ℓ

where  a0 = -----  f(t)  dt 

ℓ - ℓ

1 ℓ

an = -----  f(t)  cos  (n t / ℓ ) dt 

ℓ - ℓ

1 ℓ

-----  f(t)  sin  (n t / ℓ ) dt 

ℓ - ℓ

and  bn =

Substituting  the  values  of  a0, an and  bn in  (1),  we  get 

f(x)  =

1

-----

ℓ

 f(t)  dt 

1 

+ --- 

ℓ

 f(t)  cos 

n(t  – x) 

----------- dt  -------(2) 

2ℓ -ℓ ℓ n=1  -ℓ ℓ

> 

a0 nx nx

f(x)  = ----- + 

2 n=1 

an cos  ---- + bn sin  ---- -------(1) 

ℓ ℓ

4.3  FOURIER  INTEGRAL  THEOREM 

If  f(x)  is  defined  in  the  interval  (-ℓ,ℓ), and  the  following  conditions 

(i)  f(x)  satisfies  the  Dirichlet‟s  conditions  in  every  interval  (-ℓ,ℓ), 

> 

(ii)    f(x)   dx  converges,  i.e.  f(x)  is  absolutely  integrable  in  (-,) 

> -
> 

are  true,  then  f(x)  = (1 ∕)   f(t)  cos (t -x) dt  d. 

> 0-

Consider  a function  f(x)  which  satisfies  the  Dirichlet‟s  conditions  in  every  interval  (-ℓ,ℓ) 

so  that,  we  have 

# MSAJCE  135 Since,  1 ℓ 1 ℓ

-----  f(t)  dt   -----   f(t)  dt  ,

2ℓ -ℓ 2ℓ -ℓ

then  by  assumption  (ii),  the  first  term  on  the  right  side  of  (2)  approaches  zero  as  ℓ

 .

As  ℓ

 , the  second  term  on  the  right  side  of (2)  becomes 

1 

 n(t  – x) 

ℓim  ---

ℓ

  ℓ

  f(t)  cos  ----------- dt 

n=1  -

 ℓ

> 

1 

= ℓim  ---     f(t)  cos { n    (t  – x)  } dt  ,on  taking  (∕ℓ) =

 .

 

0  n=1  -

> 

By  the  definition of  integral as  the limit of sum  and (n ∕ℓ ) =  as  ℓ

  , the  second 

term  of  (2)  takes  the  form 

1 

> 

---   f(t)  cos   (t  – x)  dt d  ,

 0 -

> 

Hence  as  ℓ

 , (2)  becomes 

1 

> 

f(x)  = ---   f(t)  cos   (t  – x)  dt  d ---------(3) 

 0

which  is  known  as  the  Fourier  integral  of  f(x). 

Note: 

When  f(x)  satisfies  the  conditions  stated  above,  equation  (3)  holds  good at  a point 

of  continuity.  But at  a point  of discontinuity,  the value  of  the  integral is  (1 / 2)  [f(x+0)  +

f(x -0)]  as  in  the  case  of  Fourier  series. 

Fourier  sine  and  cosine  Integrals 

The  Fourier  integral  of  f(x)  is  given  by  

> 

f(x)  = ---   f(t)  cos  (t  – x)  dt  d

 0 -

> 

1 

> 

= ---   f(t)  { cos t .  cos x + sin t . sin x } dt  d

 0 -

> 

1 

> 
> 

1

> 
> 

1

# MSAJCE  136 = ---  cos x  f(t) cos t dt  d +  sin x  f(t) sin t dt d  ----(4) 

 0 0- 

> -
> 

When  f(x)  is  an  odd  function,  f(t)  cos t is  odd  while  f(t)  sin t is  even.  Then  the  first 

integral  of  (4)  vanishes  and,  we  get 

2

f(x)  = -------(5) 

 0

> 
> 

 sin x  f(t) sin t dt  d

> -
> 

which  is  known  as  the  Fourier  sine  integral. 

Similarly,  when  f(x)  is  an  even  function,  (4)  takes the  form 

2

f(x)  =

 0

> 
> 

 cos x  f(t) cos t dt  d -------(6) 

> -
> 

which  is  known  as  the  Fourier  cosine  integral. 

Complex  form  of  Fourier  Integrals 

The  Fourier  integral  of  f(x)  is given  by 

1 

> 

---   f(t)  cos  (t  – x) dt  d

 0 -

> 

f(x)  =

1 

> 

= ---  f(t)   cos  (t  – x)  d dt 

 - 

> 0

Since  cos  (t  – x)  is an even function of  , we  have  by  the  property  of definite  integrals 

1

> 
> 

f(x)  = ---  f(t)  (1 / 2)   cos  (t  – x)  d dt 

 - 

> -
> 

1 

> 

i.e.,  f(x)  = ---   f(t)  cos  (t  – x)  dt  d ---------(7) 

2 - 

> -
> 

Similarly,  since  sin  (t  – x)  is  an  odd function  of  , we  have 

# MSAJCE  137  

0 = ---   f(t)  sin  (t  – x)  dt  d

2 - 

> -
> 

---------(8) 

Multiplying  (8)  by  „i  ‟ and adding  to (7), we  get 

1 

> 

f(x)  = ---   f(t)  ei(t  – x)  dt  d ---------(9) 

2 - 

> -
> 

which  is  the  complex  form  of  the  Fourier  integral. 

4.4  Fourier  Transforms  and  its  properties 

Fourier  Transform 

We  know  that  the  complex  form  of  Fourier  integral  is 

1  

  f(t)  ei(t -x)  dt  d. 

> --

f(x)  =

2

Replacing   by  s,  we  get 

1 

 e- isx  ds 

> 

 f(t)  eist  dt  .

> -

f(x)  =

2 -

It  follows  that  if 

1 

 f(t)  eist  dt  --------------- (1) F(s)  =

2 -

1 

 F(s)  e-isx  ds  --------------- (2) 

> -

Then,  f(x)  =

2

The  function  F(s),  defined  by  (1),  is  called  the  Fourier  Transform  of  f(x) . The  function 

f(x),  as  given  by  (2),  is  called  the  inverse  Fourier  Transform  of  F(s) . The  equation  (2)

is  also  referred  to  as  the  inversion  formula .

Properties  of  Fourier  Transforms 

(1)  Linearity  Property 

If  F(s)  and  G(s)  are  Fourier  Transforms  of  f(x)  and  g(x)  respectively,  then 

# MSAJCE  138 F{a  f(x)  + bg(x)}  = a F(s)  + bG(s), 

where  a and  b are  constants. 

1

We  have  F(s)  =

2

1

> 

 eisx  f(x)  dx  

> -



 eisx  g(x)  dx 

2 - 

G(s)  =

Therefore, 

1 

 eisx  {a  f(x) +  bg(x)}dx F{a  f(x) +  b g(x)}  =

2 - 

1  1 

 eisx  g(x)  dx = a  eisx  f(x) dx  + b

2 - 

= a F(s)  + bG(s) 

2 - 

i.e,  F{a f(x)  + bg(x)}  = a F(s)  + bG(s) 

(2)  Shifting  Property 

(i)  If  F(s)  is  the  complex Fourier  Transform  of  f(x),  then 

F{f(x -a)}  = eisa  F(s). 

We  have  F(s)  =

1

2



 eisx  f(x)  dx  ----------------( i )

- 

Now,  F{f(x -a)}  =

1 

 eisx  f(x -a)  dx 

2 - 

Putting  x-a = t,  we  have 

1 

F{f(x -a)}  =  eis(t+a)  f(t)  dt  .

2 - 

1 

= e ias   eist  f(t)  dt  .

2 - 

# MSAJCE  139 = eias  . F(s).  ( by  (i)  ). 

(ii)  If  F(s)  is  the  complex Fourier  Transform  of  f(x),  then 

F{e iax  f(x)  } = F(s+a). 

1 

We  have  F(s)  =  eisx  f(x)  dx  ----------------( i  )

2 - 

1 

Now,  F{e iax  f(x)}  =  eisx  .e iax  f(x)  dx. 

2 - 

1 

=  ei(s+a)x.  f(x)  dx  .

2 - 

= F(s+a)  by  (i)  .

(3)  Change  of  scale  property 

If  F(s)  is  the  complex Fourier  transform  of  f(x),  then 

F{f(ax)}  =1/a  F(s/a),  a  0. 

1 

 eisx  f(x)  dx  ----------------( i )

2 - 

We  have  F(s)  =

1 

 eisx  f(ax)  dx. 

2 - 

Now,  F{f(ax)}  =

Put  ax =  t,  so  that  dx  = dt/a. 

1 

 e ist/a  .f(t)  dt/a  .

2 - 

F{f(ax)}  =

1 1 

.  ei(s/a)t  f(t)  dt  .=

a 2 - 

1

# MSAJCE  140 = . F(s/a).  ( by  (i)  ). 

a

(4)  Modulation  theorem .

If  F(s)  is  the  complex Fourier  transform  of  f(x), 

Then  F{f(x)  cosax}  = ½{F(s+a)  + F(s -a)}. 

1 

We  have  F(s)  =  eisx  f(x)  dx 

2 - 

1 

Now,  F{f(x)  cosax}  =  eisx  .f(x) cosax.  dx. 

2 - 

1  eiax  + e-iax 

=  eisx.  f(x)  dx  .

2 -  2

1 1  1 

 ei(s -a)x  f(x)  dx =  ei(s+a)x  .f(x)  dx  +

2 2 -  2 -

1

= { F(s+a) +  F(s -a)} 

2

(5)  nth  derivative  of  the  Fourier  Transform 

If  F(s)  is  the  complex  Fourier  Transform  of  f(x), 

Then  F{x n f(x)}  = (-i) n dn/ds n .F(s). 

1 

We  have  F(s)  =  eisx  f(x)  dx  ------------------- (i) 

2 - 

# MSAJCE  141 Differentiating  (i)  „n‟  times  w.r.t  „s‟,  we  get 

dn F(s)  1 

 (ix) n. e isx  f(x)  dx 

2 - 

=

ds n

(i) n 

 eisx  {x n f(x)}  dx 

2 -

=

= ( i )n F{x n f(x)}. 

1 dn F(s) 

 F{x n f(x)}  = .

(i) n ds n

dn

i.e, F{x n f(x)}  = (-i) n F(s). 

ds n

(6)  Fourier  Transform  of  the  derivatives  of  a function .

If  F(s)  is  the  complex Fourier  Transform  of  f(x), 

Then,  F{f  „(x)}  = -is  F(s)  if  f(x)   0 as  x   .

1 

 eisx  f(x) dx  .

2 - 

We  have  F(s)  =

1 

 eisx  f „(x)  dx. 

2 - 

Now,  F{f  „(x)}  =

1 

 eisx  d{f  (x)}. 

2 - 

=

1 

eisx .f(x)  - is 



 f(x).  eisx  dx. =

2 - -

# MSAJCE  142 1 

= - is   eisx  f(x) dx  , provided f(x) =  0

2 -  as  x    .

= - is  F(s). 

i.e,  F{f  ‟(x)}  = - is  F(s)  ---------------------( i )

Then  the  Fourier  Transform  of  f  (x), 

1 

 eisx  f (x)  dx. 

2 - 

i.e,  F{f  (x)}  =

1 

 eisx  d{f  ‟(x)}. 

2 - 

=

1

= eisx .f  „(x) 

2

 

-  f „(x).  eisx  .(is)dx. 

- -

1 

= - is   eisx  f „(x)  dx  , provided  f „(x)  = 0

2 -  as  x    .

= - is F{f  „(x).} 

= (-is).( -is)F(s).  by(  i ). 

= (-is) 2 . F(s). 

i.e,  F{f “(x)}  = (- is) 2 .F(s)  , Provided f  , f‟  0

as x    .

In  general,  the  Fourier  transform  of  the  nth  derivative  of  f(x)  is  given  by 

F{f  n(x)}  = (-is) n F(s), 

provided  the  first  „n -1‟  derivatives  vanish  as  x   .

Property  (7) 

x F(s) 

If  F(s)  is  the  complex  Fourier  Transform  of  f(x),  then  F  f(x)dx  =

a (-is) 

# MSAJCE  143 

Then,  F{f( -x)}  = F(s),  where  bar  denotes complex  conjugate. 

Proof  

> 

1  

F(s)  =  f(x)  e-isx  dx  .

2 -

Putting  x = -t,  we  get  

> 

1  

F(s)  =  f( -t)  eisx  dt  .

2 -

x

Let  g(x) =   f(x) dx  .

a

Then,  g‟(x)  = f(x).  ------------( i )

Now  f [g„(x)]  = (-is) G(s), by  property  (6). 

= (-is).  F{g(x)} 

x

= (-is).  F  f(x)  dx  .

a

x

i.e,  F{g‟(x)}  = (-is).  F  f(x)  dx  .

a

x

i.e,  F  f(x)  dx  =

a

1

. F{g‟(x)}. 

(-is) 

1

= F{f  (x)}.  [ by  ( i )] 

(-is) 

x

Thus,  F  f(x)  dx  =

a

F(s) 

.

(-is) 

Property  (8) 

If  F(s)  is  the  complex Fourier  transform  of  f(x), 

# MSAJCE  144 

= F{f( -x)}  .

Note : If  F{f(x)}  = F(s),  then 

(i)  F{f( -x)}  = F( -s). 

> 

(ii)  F{f(x)}  = F( -s). 

Example  1

Find  the  F.T  of  f(x)  defined  by 

f(x)  = 0 x<a 

= 1 a<x<b 

= 0 x>b. 

The  F.T  of  f(x)  is  given  by 

1 

 eisx  f (x)  dx. 

2 - 

F{f  (x)}  =

1 b

 eisx  .dx  .=

2 a

1 eisx  b

=

2 is  a

1 eibs  – eias 

= .

2 is 

Example  2

Find  the  F.T  of  f(x) =  x for   x   a

= 0 for   x  > a. 

1 

 eisx  f (x)  dx. 

2 - 

F{f  (x)}  =

1 a

 eisx  .x.dx. 

2 -a

=

# MSAJCE  145 1 a

 x .d 

2 -a

eisx 

=

is 

a

1 xe isx  eisx 

= -

2 is  (is) 2

-a

1 ae isa  eisa  ae -isa  e-isa 

= - + +

2 is  (is) 2 is  (is) 2

1 a 1

= (e isa  + e-isa  ) + (e isa  - e-isa  )

2 is  s2

1 -2ai  2i 

= cossa  + sinsa 

2 s s2

2i  1

= . [sinsa  - as  cossa]. 

s2 2

i [sinsa  - as  cossa] 

= (2/ )

s2

Example  3

Find  the  F.T  of  f(x)  = e iax  , 0 <  x < 1

= 0 otherwise 

The  F.T  of  f(x)  is  given  by 

1 

F{f  (x)}  =  eisx  f (x)  dx. 

2 - 

1 1

 eisx  . eiax  dx. =

# MSAJCE  146 2 0

1 1

2

 ei(s+a)x  .dx  .

0

=

1 ei(s+a)x  1

=

2 i(s+a)  0

1

= {e i(s+a)x  -1} 

i2.(s+a) 

i

= {1 - ei(s+a) }

2.(s+a) 

Example  4   

> 2222

Find  the  F.T  of  e-a x , a>0 and hence  deduce  that  the F.T of  e-x / 2 is  e-s / 2.

The  F.T  of  f(x)  is  given  by 

1 

F{f  (x)}  =  eisx  f (x)  dx. 

2 - 

1  2 2 

> 22

e-s / 4a   2

e-[ax  – (is/2a)]  dx  .= 

2 - 

> 22

e-s /  4a  2

 e-t

= dt,  by  putting  ax  –(is/2a)  = t

a2 - 

> 22

e-s / 4a   2

= .   , since   e-t dt  =   (using  Gamma  functions). 

-a2

F e-a2x 2 –a x isx 

=  e . e .dx. 

2 -

# MSAJCE  147 1 2 2

e-s /  4a  .= ----------------(i) 

2.a 

> 2

To find  F{e -x / 2}

Putting  a = 1/  2 in  (1),  we  get  

> 22

F{e -x / 2 } = e-s / 2  .

Note :

If  the  F.T  of  f(x)  is  f(s),  the  function  f(x)  is  called  self -reciprocal.  In  the  above 

> 2

example  e -x / 2 is  self -reciprocal under  F.T. 

Example  5

Find  the  F.T  of 

f(x)  = 1 for  x<1. 

= 0 for  x>1. 

> 

Hence  evaluate   sinx  dx. 

1

=

2

1

= .

2 is 

sins 

=(2/ ) , s ≠ 0

s

sins 

Thus,  F{f(x)}=  F(s)  =(2/ ).  , s ≠  0

1 1

 eisx  .(1).dx  .

2 -1 1

eisx 

is  -1

eis  – e -is  

> 0

x

The  F.T  of  f(x), 

1 

 eisx  f (x)  dx. 

2 - 

i.e.,  F{f  (x)}  =

=

# MSAJCE  148 s

Now  by  the  inversion  formula  , we  get 

1 

 f(s).  e-isx  .ds. 

2 - 

f(x)  =

 sins 

=  (2/ )

- s

1 for  x<1 

or  . e -isx  .ds.= 

0 for  x>1. 

1  sins 



 - s

1 for  x<1 

i.e,  e-isx  . ds.= 

0 for  x>1. 

Putting  x = 0,  we  get 

1  sins 



 - s

ds =  1

2  sins 



 0 s

i.e,  ds =  1,  since  the  integrand  is  even. 



 ds  =

 sins 



0 s 2

 sinx 

Hence,  

0



dx  =

x 2

Exercises 

(1)  Find  the  Fourier  transform  of 

1 for  x<a 

0 for  x>a. 

f(x)  =

(2)  Find  the  Fourier  transform  of 

x2 for  x a

f(x)  =

0 for  x>a. 

# MSAJCE  149 (3)  Find  the  Fourier  transform  of 

a2 – x2 ,

f(x)  =

x<a 

0 , x >a>0. 

Hence  deduce  that   sint  - tcost  



-

dt  =

t3 4

(4)  Find  the Fourier  transform  of  e-ax and  x e-ax. Also  deduce  that 

 cosxt  

 dt  =

- a2 + t2 2a 

e-ax

d

{Hint  : F{x.  e-ax} = - i F{  e-ax}} 

ds 

4.5  Convolution  Theorem  and  Parseval’s  identity .

The  convolution  of  two  functions  f(x)  and  g(x)  is  defined  as 

1 

f(x)  * g(x)  =  f(t).  g(x -t).  dt. 

2 -

Convolution  Theorem  for  Fourier  Transforms. 

The  Fourier  Transform  of  the  convolution  of  f(x)  and  g(x)  is  the  product  of  their 

Fourier  Transforms, 

i.e,  F{f(x)  * g(x)}  = F{f(x).F{g(x)}. 

Proof: 

F{f(x)  * g(x)}  = F{(f*g)x)} 

1 

=  (f  *g)(x). e isx  . dx. 

2 - 

 f(t). g(x -t). dt  eisx  dx  .

1  1 

= 

2 - 2 -

# MSAJCE  150 1  1 

=  f(t)   g(x -t). e isx  dx  . dt. 

2 - 2 -

(by  changing  the  order  of  integration). 

1 

=  f (t).F{g(x -t)}.  dt. 

2 - 

1 

=  f(t).  eits  .G(s).  dt.  (by  shifting  property) 

2 - 

1 

= G(s).   f(t). e ist  dt. 

2 - 

= F(s).G(s). 

Hence,  F{f(x)  * g(x)}  = F{f(x).F{g(x)}. 

Parseval’s  identity  for  Fourier  Transforms 

If  F(s)  is  the  F.T  of  f(x),  then 

 

 f(x) 2 dx  =  F(s) 2 ds. 

- -

Proof: 

By  convolution  theorem,  we  have 

F{f(x)  * g(x)}  = F(s).G(s). 

Therefore,  (f*g) (x) =  F-1{F(s).G(s)}. 

1  1 

i.e,   f(t).  g(x -t).  dt  =  F(s).G(s).e -isx  ds.  ----------(1) 

2 - 2 -

(by  using  the  inversion  formula) 

Putting  x = 0 in (1)  , we  get 

 

 f(t).  g( -t).  dt  =  F(s).G(s).ds.  ----------(2) 

# MSAJCE  151  

Since  (2)  is  true  for all  g(t), take  g(t)  = f( -t) and hence  g( -t) =  f(t)  ---------(3) 

Also,  G(s)  = F{g(t)} 

> 

= F{f( -t)} 

> 

0 t4

Here,  F{f(x)}= 

1 1

 (1 - x )e isx  dx. 

2 -1

1 1

 (1 - x) (cossx  + i sinsx)  dx. 

2 -1

=

1 1 i 1

 (1 - x) cossx  dx.+  (1 - x) sinsx  dx. 

2 -1 2 -1

=

= F(s)  ----------------(4)  (by  the  property  of  F.T). 

Using  (3)  & (4)  in  (2),  we  have 

  

 f(t).f(t). dt  =  F(s).F(s).ds. 

- -

 

  f(t) 2 dt =   F(s) 2 ds. 

- -

 

i.e,   f(x) 2 dx  =  F(s) 2 ds. 

- -

Example  6

Find  the  F.T of f  (x) =  1-x for  x   1. 

= 0 for  x > 1



and  hence  find  the  value   sin 4t dt. 

- -

# MSAJCE  152 1 1

2  (1 - x) cossx  dx.  by  the  property  of definite  integral. 

2 0

=

sinsx 1

= (2/ )  (1 -x)  d

0 s

1

sinsx  cossx 

= (2/ ) (1 -x)  -(-1)  -

s s2

0

1- coss 

= (2/ )

dx. =  /3.  

0

Setting  s/2  = x , we  get 

16   sin 4 x

 2.dx. =  2/3. 

 0 16x 4

 sin 4 x

x4

Example  7

Find  the  F.T  of  f(x)  if 

s2

Using  Parseval‟s  identity,  we  get 

2  1

 (1 -coss) 2 ds.  = (1 - x)2 dx. 

s4

 - -1

4  1

  (1 -coss) 2 ds. = 2  (1 - x) 2 dx = 2/3. 

s4

 0 0

16  

i.e,   sin 4(s/2) ds. =  2/3. 

 0 s4

# MSAJCE  153 1 for  x<a 

f(x)  =

0 for  x>a>0. 



Using  Parseval‟s  identity,  prove   sint  2 dt.  = /2. 

0 t

Here,  1

F{f(x)}  =

a

 eisx  .(1)  .dx  .

2 -a

1 eisx  a

=

2 is  -a

1 eisa  – eisa 

=

2 is 

sinas 

= (2/ )

s

sinas 

i.e.,  F(s)  = (2/ ) .

s

Using  Parseval‟s  identity 

 

  f (x)   2 dx  =   F(s)   2 ds, 

- -

we  have 

sinas  2

a 

 1 .  dx  =  (2/ )

-a -

ds. 

s



2a  = (2 /) 

-

sinas  2

ds. 

s

Setting  as  = t,  we  get 

# MSAJCE  154  sint 

(2/ ) 

-

> 2

dt /a = 2a 

( t/a) 

 sint 



-

> 2

i.e.,  dt  = 

t

 sint 

2 

0

> 2

 dt  = 

t

 sint 



0

> 2

Hence,  dt  =  / 2. 

t

4.6  Fourier  sine  and  cosine  transforms: 

Fourier  sine  Transform 

We  know  that  the  Fourier  sine  integral  is 

2  

 sin  x .  f(t) sin t dt.d .

> 0

f(x)  =

 0

Replacing   by  s,  we  get 

2  

f(x)  =  sinsx  .  f(t)  sinst  dt.  ds. 

 0 0

It  follows  that  if 

Fs(s)  = (2/  )

> 

 f(t)  sinst  dt.. 

> 0
> 

 f(x)  sinsx  dx. 

> 0

i.e.,  Fs(s)  = (2/  ) ------------(1) 

> 

= (2/  )  Fs(s)  sinsx  ds. 

> 0

then  f(x)  ------------(2) 

# MSAJCE  155 The  function  Fs(s),  as  defined  by  (1),  is  known  as  the  Fourier  sine  transform  of  f(x) .

Also  the  function  f(x),  as  given  by  (2),is  called  the  Inverse  Fourier  sine  transform  of 

Fs(s)  .

Fourier  cosine  transform 

Similarly,  it  follows  from  the  Fourier  cosine  integral 

2  

 cos  x .  f(t)  cos t dt.d .

> 0

f(x)  =

 0

> 

Fc(s)  = (2/  )  f(x)  cossx  dx. 

> 0

that  if  ------------(3) 

> 

= (2/  )  Fc(s)  cossx  ds. 

> 0

then  f(x)  ------------(4) 

The  function  Fc(s),  as  defined  by  (3),  is  known  as the  Fourier  cosine  transform  of 

f(x).  Also  the  function  f(x),  as  given  by  (4),is  called  the  Inverse  Fourier  cosine 

transform  of  Fc(s)  .

Properties  of  Fourier  sine  and  cosine  Transforms 

If  Fs(s)  and  Fc(s)  are  the  Fourier  sine  and  cosine  transforms  of  f(x)  respectively,  the 

following  properties  and identities  are  true. 

(1)  Linearity  property 

Fs [a  f(x)  + b g(x)  ] =  a Fs { f(x) }  + b Fs { g(x)  }. 

and  Fc [a  f(x)  + b g(x) ]  = a Fc { f(x)  } +  b F c { g(x)  }. 

(2)  Change  of  scale  property 

Fs [ f(ax)  ] = (1/a)  Fs [ s/a  ]. 

and  Fc [ f(ax)  ] = (1/a)  Fc [ s/a  ]. 

(3)  Modulation  Theorem 

i.  Fs [ f(x)  sinax  ] =  (1/2)  [ Fc (s -a)  - Fc (s+a)]. 

ii.  Fs [ f(x)  cosax  ] =  (1/2)  [ Fs (s+a)  + Fs (s -a)]. 

# MSAJCE  156 iii.  Fc[ f(x)  cosax  ] = (1/2)  [ Fc (s+a)  + Fc (s -a)  ]. 

iv.  Fc[ f(x)  sinax  ] = (1/2)  [ Fs (s+a)  - Fs (s -a)  ]. 

Proof 

The  Fourier  sine  transform  of  f(x)sinax  is  given  by 

> 

Fs [ f(x)  sinax  ] = (2/  )  (f(x)  sinax)  sinsx  dx. 

> 0
> 

= (1/2)  (2/  )  f(x)  [cos(s -a)x  – cos(s+a)x]  dx. 

> 0

= (1/2)  [ Fc (s -a)  – Fc (s+a)  ]. 

Similarly,  we  can  prove  the  results  (ii),  (iii)  & (iv). 

(4)  Parseval’s  identity  

> 

 Fc(s)  Gc(s)  ds  =  f(x)  g(x)  dx  . 

> 00
> 

 Fs(s)  Gs(s)  ds  =

> 0
> 

 Fc(s)  2 ds  =

> 0
> 

 f(x)  g(x) dx  .

> 0
> 

 f(x)  2 dx  . 

> 0
> 0
> 

 Fs(s)  2 ds  =  f(x)  2 dx  .

> 0

Proof  

> 

 Fc(s)  Gc(s)  ds  =  Fc(s)  [(2/  )  g(t)  cosst  dt]  ds    

> 000
> 

=  g(t)  [(2/  )  Fc(s)  cosst ds]  dt  

> 00
> 

=  g(t) f(t)  dt 

# MSAJCE  157  

i.e.,   Fc(s)  Gc(s)  ds  =  f(x)  g(x) dx  . 

> 00

Similarly,  we  can  prove the  second  identity  and  the  other  identities  follow  by  setting 

g(x)  = f(x)  in the  first  identity. 

Property  (5) 

If  Fs(s)  and  Fc(s)  are  the  Fourier  sine  and  cosine  transforms  of  f(x)  respectively,  then 

d

(i)  Fs{ x f(x)  } = - Fc(s)  .

ds 

d

(ii)  Fc{ x f(x)  } = - Fs(s)  .

ds 

Proof 

The  Fourier  cosine  transform  of  f(x), 

> 

i.e.,  Fc(s)  = (2/  )  f(x)  cossx  dx. 

> 0

Differentiating  w.r.t  s,  we  get 

d 

[ Fc(s)  ] = (2/  )  f(x)  {- x sin  sx  } dx. 

> 0

ds 

Fc{x f(x)}  = - { Fs(s)  }

> 

= - (2/  )  ( x f(x))  sin sx  dx. 

> 0

= - Fs{x  f(x)} 

d

i.e.,  Fs{x f(x)}  = - { Fc(s)  }

ds 

Similarly,  we  can  prove 

d

ds 

Example  8

Find  the  Fourier sine  and  cosine transforms  of  e-ax  and  hence  deduce  the  inversion 

formula. 

The  Fourier  sine  transform  of  f(x)  is  given  by 

> 

Fs { f(x) }  = (2/  )  f(x) sinsx  dx. 

> 0

# MSAJCE  158 

= (2/  )  e-ax  sinsx  dx. 

> 0

e-ax  ( - a sinsx  – s cossx) 

Now  , Fs { e-ax  }

> 

= (2/  )

a2 + s2

> 0

s

= (2/  ) , if  a>0 

a2 + s2

The  Fourier  cosine  transform  of  f(x)  is  given  by 

> 

Fc { f(x) }  = (2/  )  f(x)  cossx  dx. 

> 0
> 

= (2/  )  e-ax  cossx  dx. 

> 0

Now  , Fc { e-ax  }

> 0

a

= (2/  ) , if  a>0 

a2 + s2

Example  9

x,  for  0<x< 1

2 – x,  for  1<x< 2

0, for  x> 2

Find  the  Fourier  cosine  transform  of  f(x)  =

> 1

i.e.,  Fc { f(x)  } = (2/  0)  x cossx  dx.  + (2/  )1

> 0
> 2

sinsx  cossx 

+ (2/  ) (2  – x)   ( - 1)  + -

s s2

> 

e-ax  ( - a cossx  + s sinsx) 

= (2/  )

a2 + s2

> 1

= (2/  )  x d

> 0

sinsx  2

+ (2/  )  ( 2  – x)  d

> 1

sinsx 

s s

> 1

sinsx  cossx 

= (2/  ) x  (1)  -

s s2

The  Fourier  cosine  transform  of  f(x), 

> 2

 (2  - x ) cossx  dx. 

# MSAJCE  159 sins  coss  1

= (2/  ) + -

s

cos2s 

s2

sins 

s2

coss 

+ - - +

s2 s s2

2 coss  cos2s  1

= (2/  ) - -

s2 s2 s2

Example  10 

> 

Find  the  Fourier  sine  transform  of  e- x . Hence  show  that  

x sinmx  e-m

dx  = ,

> 0

m>0. 

The  Fourier  sine  transform  of  f(x)  is  given  by 

> 

1+x 2 2

Fs { f(x) }  = (2/  )  f(x)  sinsx  dx. 

> 0
> 

 e-x sinsx  dx. 

> 0

= (2/  )

> 

(2/  )  (2/  )

> 0

s

sin  sx  ds.  = e-x

1 +  s2

Replacing  x by  m, 

> 

e -m = (2/  ) 

> 0

s sinms 

ds 

1 +  s2 

> 

x sinmx 

> 

e-x ( - sinsx  – s cossx) 

= (2/  )

1 +  s2

> 0

s

= (2/  ) .

1 +  s2

Using  inversion  formula  for  Fourier  sine  transforms,  we  get 

# MSAJCE  160 = (2/  ) 

> 0

dx 

1 +  x2

> 



x sinmx  e-m

Hence,  dx  = 

> 0

1 +  x2 2

Example  11 

x 1

Find  the  Fourier  sine  transform  of  and  the  Fourier  cosine  transform  of  .

a2+x 2

x

a2+x 2

To  find  the  Fourier  sine  transform  of  ,

a2+x 2

We  have  to find  Fs { e-ax  }. 

s

= (2/  ) .

a2 + s2

Using  inversion  formula  for  Fourier  sine  transforms,  we  get 

> 

= (2/  )  (2/  )

> 0

s

e-ax  sinsx  ds. 

a2 + s2

> 



> 0

s sinsx  e-ax 

i.e.,  ds  = , a>0 

s2 + a2 2

Changing  x by  s,  we  get 

> 



> 0

x sinsx  e-as 

dx  = ------------(1) 

x2 + a2 2

x  x

Now  Fs = (2/  ) 

> 0

sinsx  dx 

x2 + a2 x2 + a2

e-as 

. = (2/  ) , using  (1) 

2

> 

= (2/  )  e-ax  sin sx  dx. 

> 0

Consider,  Fs { e-ax  }

# MSAJCE  161 = (/2)  e-as 

1

Similarly,for  finding  the  Fourier  cosine  transform  of  , we  have  to  findF c{e -ax }. 

a2 + x2

> 

= (2/  )  e-ax  cossx  dx. 

> 0

a

Consider  , Fc{ e-ax  }

= (2/  ) .

a2 + s2

Using  inversion  formula for  Fourier  cosine  transforms,  we  get 

> 

= (2/  )  (2/  )

> 0

a

e-ax  cossx  ds. 

a2 + s2

> 



> 0

cossx  e-ax 

i.e.,  ds  =

s2 + a2 2a 

Changing  x by  s,  we  get  

> 

cossx  e-as 

 dx  = ------------(2)  

> 0

x2 + a2 2a 

Now,  Fc

> 

= (2/  ) 

> 0

cossx  dx 

x2 + a2 x2 + a2

Example  12  

> 22

Find  the  Fourier  cosine  transform  of  e-a x and  hence  evaluate  the  Fourier sine  transform  

> 22

xe -a x

of  . 

> 22

e-as 

. = (2/  )

2a 

e-as 

= (/2) 

a

, using  (2) 

1 1

# MSAJCE  162 The  Fourier  cosine  transform  of  e-a x is  given  by  

> 22

Fc{e -a x cossx  dx   

> 22

} = (2/  )  e-a x  

> 0
> 22

= Real  part  of  (2/  )  e-a x e isx  dx 

> 0

1 2 2

e -s / 4a  .= Real  part  of  (Refer  example  (4)  of  section  4.4) 

a .2. 

1 2 2

e -s / 4a  .= ----------------(i) 

a .2. 

d

But  , Fs {x  f(x)}  = - Fc (s) 

ds  

> 22

 Fs {x  e-a x } = -

d 1 2 2

e -s / 4 a , by  (1) 

ds  a 2

1 2 2

e - s / 4 a ( - s /  2a 2). = -

a 2

s

=

2 2.  a3 

> 22

dx 

Evaluate  

> 0

Example  13 

> 

using  transform  methods. 

(a 2 + x2)(b 2 + x2)

e -s / 4 a .

Fc [ 1 /  x ] = 1 /  s

and  Fs [ 1 /  x ] = 1 / s

This  shows  that  1 / x is  self -reciprocal. 

# MSAJCE  163 Let f(x)  = e –ax  , g(x)  = e- bx 

> 

 e-ax  cossx  dx. 

> 0

a

Then  Fc{ s } = (2/  )

= (2/  ) .

a2 + s2

b

.

b2 + s2

Similarly,  Gc{ s }  = (2/  )

Now  using  Parseval‟s  identity  for  Fourier  cosine  transforms,  

> 

i.e.,   Fc(s)  . G c(s)  ds =   f(x)  g(x)dx.  

> 00

2 ab 



> 0
> 

 e–(a+b)x  dx 

> 0

we  have,  ds  =

 (a 2 + s2)(b 2 +s 2)

2ab  



> 0

ds  e–(a+b)x  

or  =

 (a 2 + s2)(b 2 +s 2) –(a+b)  0

= 1 / (  a+b  )

> 

and  0  (a 2 + x2)2

s 

> 0

 (a 2 + x2)2

Let  f(x)  = e-ax 

Then  Fs(s)  = (2/  ) ,

a2 + s2

a

Fc(s)  = (2/  )

a2 + s2

> 



> 0

dx  

Thus,  =

(a 2 + x2)(b 2 + x2) 2ab(a+b) 

Example  14 

Using  Parseval‟s  identity , evaluate  the  integrals  

> 

dx  x2

dx  if a  > 0

# MSAJCE  164 Now,  Using  Parseval‟s  identity  for  sine  transforms, 

i.e.,  0 

> 

 Fs(s)  2 ds  =  f(x)  2 dx  . 

> 0
> 

s2 

 e-2ax  dx 

> 0

we  get,  (2/  ) 

> 0

or  (2/  )

> 



> 0

Thus 

> 



> 0

ds  =

(a 2 + s2)2

s2 e-2ax   1

ds  = =

(a 2 + s2)2 -2a  0 2a 

x2 

dx  =

(a 2 + x2)2 4a 

, if  a > 0

Now,  Using  Parseval‟s  identity  for  cosine  transforms, 

i.e.,  f(x)  2 dx  . 

> 0
> 

 Fc(s)  2 ds  = 

> 0
> 

we  get,  (2/  ) 

> 0

a2 

 e-2ax  dx 

> 0

ds  =

(a 2 + s2)2

> 

(2a 2/ ) 

> 0

ds  1

or  =

(a 2 + s2)2

dx 

2a 

> 



> 0



Thus  , = , if a  > 0

(a 2 + x2)2 4a  3

# MSAJCE  165 Exercises 

1.  Find  the  Fourier  sine  transform  of  the  function 

f(x)  = sin  x , 0   x < a. 

0 , x > a

2.  Find  the  Fourier  cosine transform  of  e-x and hence  deduce  by  using  the  inversion 

formula 

cos  x dx  

 = e - 

> 0

(1  + x2) 2

3.  Find  the  Fourier  cosine  transform  of  e-ax sin  ax. 

4.  Find  the  Fourier  cosine transform  of  e-2x  + 3 e -x

5.  Find  the  Fourier  cosine  transform  of 

e-ax  / x(i)  (ii)  ( e-ax  - e-bx  ) /  x

6.  Find, when  n > 0

(i)  Fs[x n-1] and 

> 

e-ax  xn-1dx  =

> 0

(n) 

(ii)  Fc[x n-1] Hint:  ,n>0,a>0 

an

7.  Find  Fc[xe -ax ] and  Fs[xe -ax ]

8.  Show that  the  Fourier  sine  transform of  1 / (1 + x 2) is  (/2)  e-s.

9.  Show  that  the  Fourier  sine  transform  of  x / (1  + x2) is  (/2)  e-s.

> 2

10.  Show  that  x e-x / 2 is  self  reciprocal  with  respect to Fourier  sine  transform. 

11.  Using  transform  methods  to  evaluate 

> 

(i)  

> 0

dx 

and 

(x 2+1)(  x2+4) 

# MSAJCE  166 UNIT -V

## Z – Transforms  AND  DIFFERENCE  EQUATIONS 

Difference  Equations 

Difference  equations  arise  naturally  in  all  situations  in  which  sequential  relation 

exists  at  various  discrete  values  of  the  independent  variables . These  equations  may  be 

thought  of  as  the  discrete  counterparts  of  the  differential  equations . Z-transform  is  a very 

useful  tool  to  solve  these  equations .

A difference  equation  is  a relation  between  the  independent  variable,  the 

dependent  variable  and  the  successive  differences of  the  dependent  variable. 

5.1 Introduction 

The  Z-transform  plays  a vital  role  in  the  field  of  communication  Engineering  and 

control  Engineering,  especially  in  digital  signal  processing . Laplace  transform  and 

Fourier  transform  are  the  most  effective  tools  in  the  study  of  continuous  time  signals, 

where  as  Z – transform  is  used  in  discrete  time  signal  analysis . The  application  of  Z –

transform  in  discrete  analysis  is  similar  to  that  of  the  Laplace  transform  in  continuous 

systems . Moreover,  Z-transform  has  many  properties  similar  to  those  of  the  Laplace 

transform . But,  the  main  difference  is  Z-transform  operates  only  on  sequences  of  the 

discrete  integer -valued  arguments . This  chapter  gives  concrete  ideas  about  Z-transforms 

and  their  properties . The  last  section  applies  Z-transforms  to  the  solution  of  difference 

equations .

For  example,  2yn + 7yn + 12y n = n2

and  3yn - 3yn - 2y n = cos  n

----------- (i) 

---------- (ii) 

are  difference  equations. 

# MSAJCE  167 The  differences  yn, 2yn, etc  can  also  be  expressed  as. 

yn = yn+1  - yn,

2yn = y n+2  - 2y n+1  + yn.

3yn = y n+3  - 3y n+2  + 3y n+1  - yn and  so  on. 

Substituting  these  in  (i)  and  (ii),  the  equations  take the  form 

yn+2  n+1  n+ 5y  +6y  =2n ----------- (iii) 

and  yn+3  - 3y n+2  = cos  n ----------- (iv) 

Note  that the  above  equations  are  free  of   s. 

If  a difference  equation  is  written  in  the  form  free  of   s,  then  the  order  of  the 

difference  equation  is  the  difference  between  the  highest  and  lowest  subscripts  of  y‟s 

occurring  in  it.  For  example,  the  order  of  equation  (iii)  is  2 and  equation  (iv)  is  1. 

The  highest  power  of  the  ys in  a difference  equation  is  defined  as  its  degree  when 

it  is  written  in  a form  free  of   s.  For  example,  the  degree  of  the  equations 

yn+3  + 5y n+2  + y n = n2 + n +  1 is  3 and  y3n+3  + 2y n+1  yn = 5 is  2. 

5.2  Linear  Difference  Equations 

A linear  difference  equation  with  constant  coefficients  is  of  the  form 

a0 yn+r  + a1 yn+r  -1 + a2 yn+r  -2 + . . . . +a ryn = (n). 

i.e., (a 0Er + a1Er-1 + a2 Er-2 + . . . . +  ar)y n = (n)  ------(1) 

where  a0, a1, a2, . . . . . ar are  constants  and  (n)  are  known  functions  of  n. 

The  equation  (1)  can  be  expressed  in  symbolic form  as 

f(E)  yn = (n)  ----------(2) 

If  (n)  is  zero,  then  equation  (2)  reduces  to 

# MSAJCE  168 f (E)  yn = 0 ----------(3) 

which  is  known  as  the  homogeneous  difference  equation  corresponding  to  (2).The 

solution 

of  (2)  consists  of  two  parts,  namely,  the  complementary  function  and  the  particular 

integral. 

The  solution  of  equation  (3)  which  involves  as  many  arbitrary  constants  as  the  order  of 

the  equation  is  called  the  complementary  function . The  particular  integral  is  a

particular  solution  of  equation(1)  and  it is a  function of  „n‟  without any  arbitrary 

constants. 

Thus  the  complete  solution  of  (1)  is given  by  yn = C.F  + P.I. 

Example  1

Form  the  difference  equation  for  the  Fibonacci  sequence  .

The  integers 0,1,1,2,3,5,8,13,21,  . . .  are  said  to form  a Fibonacci  sequence. 

If  yn be  the  nth  term  of  this  sequence,  then 

yn = yn-1 + yn-2 for  n >  2

or  yn+2  - yn+1  - yn = 0 for  n > 0

5.3  Z - Transforms and  its  Properties 

## Definition 

Let  {f n} be  a sequence  defined for  n = 0,1,2,…….,then  its  Z-transform F(z)  is defined  as 

> 

F(z)  = Z{f n} =   fn z –n ,

> n=0

whenever  the  series  converges  and  it  depends  on  the  sequence  {f n}. 

The  inverse  Z-transform  of  F(z)  is  given  by  Z-1{F(z)}  = {f n}. 

Note:  If  {f n} is  defined  for  n = 0,  ± 1,  ± 2,  …….,  then 

> 

F(z)  = Z{f n} =   fn z –n , which  is  known  as  the  two  – sided  Z- transform.    

> n=-

Properties  of  Z-Transforms 

1.  The  Z-transform  is  linear. 

# MSAJCE  169 i.e,  if  F(z)  = Z{f n} and  G(z)  = Z{g n},  then 

Z{af n + bg n} = aF(z)  + bG(z). 

Proof: 

> 

Z{  af n + bg n} =  { af n + bg n} z -n

> n=0

(by  definition)  

> 

= a  fn z-n + b gn z-n 

> n=0 n=0

= aF(z)  + b G(z) 

2.  If  Z{f n} = F(z),  then  Z{a nfn} = F (z/a) 

Proof:  By  definition,  we  have 

> 

Z { anfn} =   an fn z-n

> n=0
> 

=  fn (z/a) -n = F(z/a) 

> n=0

Corollary: 

If  Z{f n} = F (z),  then Z{  a-nfn} = F(az). 

dF  (z) 

3.  Z{nf n} =  -z ---------

dz 

Proof 

> 

We  have  F(z)=   fn z-n

> n=0

Differentiating,  we  get 

dF(z)  

------ =  fn (-n)  z-n -1

dz  n=0 

1 

= - -----  nf n z-n

z n=0 

1

= - --- Z{nf n}

z

# MSAJCE  170 dF  (z) 

Hence, Z{nf n} = -z ---------

dz 

4. If  Z{f n} = F(z),  then 

Z{f n+k }=  zk{ F(z)  – f0 – (f  1 / z ) - … - ( fk-1 / zk-1) } (k  > 0) 

Proof 

> 

Z { f n+k } =  fn+k  z-n , by  definition. 

> n=0
> 

=  fn+k  z-n zk z-k

> n=0
> 

= zk  fn+k  z - (n+k) 

> n=0
> 

= zk  fm z-m , where  m = n+k  .

> m=k

= zk {F(z)  – f0 – (f 1/z)  - .. ..  ..  – ( fk-1 / z k-1) }

In  Particular, 

(i)  Z{f  n+1 } = z {F(z)  - f0}

(ii)  Z{f  n+2 }=  z2 { F(z)  – f0 – (f 1/z)  }

Corollary 

If  Z{f n} = F(z),  then  Z{f n–k} = z-k F(z). 

(5)  Initial  value  Theorem 

If  Z {f n} =  F (z),  then  fo = ℓt  F(z) 

> z-

Proof 

We  know that F  (z) =  f0 + f1 z-1 + f2z-2 + . .  .

Taking  limits  as  z   on  both  sides,  we  get 

# MSAJCE  171 ℓt  F(z) =  f0  

> z

Similarly,  we  can  find 

f1 = ℓt  { z [F(z)  – f0]};  f2 = ℓt  { z2 [F(z)  – f0- f1z-1]}  and  so  on.      

> zz

(6)  Final  value  Theorem 

If  Z{f n} = F(z),  then  ℓt  fn = ℓt  (z -1)  F(z)     

> nz1

Proof 

By  definition,  we  have 

> 

Z {f n+1  – fn} =   {f n+1  – fn} z-n

> n=0
> 

Z{f n+1 } – Z{f n} =  {f n+1  – fn} z-n

> n=0
> 

ie,  z {F(z)  – f0} – F(z)  =  {f n+1  – fn} z-n

> n=0
> 

(z  –1)  F(z)  – f0z =  {f n+1  – fn} z-n

> n=0

Taking,  limits  as  z  1 on  both  sides,  we  get 

> 

ℓt  {(z  –1)  F(z)}  – f0 = ℓt   {f n+1  – fn} z-n    

> z1z1n=0
> 

=  (f n+1  – fn) = (f 1 – f0) + (f 2 –f1) + . . . + (f n+1  – fn)

> n=0

= ℓt   

> n

fn+1  – f0

i.e,  ℓt  {(z  –1)  F(z)}  – f0 = f - f0 

> z1

Hence,  f = ℓt  [(z -1)  F(z)]  

> z1

i.e,  ℓt  fn = ℓt  [(z -1)  F(z)]     

> nz1

# MSAJCE  172 SOME  STANDARD  RESULTS 

1.  Z{a n} = z /  (z -a),  for |z|  > |a|. 

Proof 

By  definition,  we  have 

> 

Z{a n} =  an z-n

> n=0
> 

=  (a/z) n

> n=0

1

=

1-(a/z) 

= z / (z -a),  for  |z|  > |a| 

In  particular,  we  have 

Z{1}  = z / (z -1),  (taking  a = 1). 

and  Z{( -1) n} =  z / (z +1),  (taking a  = -1). 

2.  Z{na n} = az  /(z -a) 2

Proof:  By  property,  we  have 

dF(z) 

Z{nf n} = -z --------

dz 

d

= -z -------- Z{a n}

dz 

d z az 

Z{na n} = -z =

dz  z-a (z -a) 2

Similarly,  we  can  prove 

Z{n 2an} = {az(z+a)}/ (z -a) 3

# MSAJCE  173 d

(3)  Z{n m} = -z ------ Z{n m-1}, where  m is  a positive  integer. 

dz 

Proof  

Z{n m} =  nm z-n

> n=0
> 

= z  nm – 1 n z-(n+1) 

> n=0

Replacing  m by  m-1,  we  get 

> 

Z{n m-1}=  z  nm – 2 n z-(n+1) 

> n=0

----------------(1) 

> 

 nm – 1 z –n.

> n=0

i.e,  Z{n m-1}= 

Differentiating  with  respect  to  z,  we  obtain 

d 

------ Z{n m-1} =  nm – 1 (-n)  z-(n+1)  ----------(2) 

dz  n=0 

Using  (2)  in  (1),  we  get 

d

Z{n m} = -z ------ Z{n m-1}, which is the  recurrence  formula. 

dz 

In  particular,  we  have 

d

Z{n}  = -z ----- Z{1} 

dz 

d z z

= -z =

dz  z-1 (z -1) 2

Similarly, 

d

Z{n 2} =  -z ----- Z{n} 

dz 

= -z

d z

dz  (z -1) 2

# MSAJCE  174 z (z+1) 

= .

(z -1) 3

z (z  - cos )

4.  Z {cosn  } = -------------------- and 

z2 - 2z cos  +1 

z sin 

Z {sinn  } =

z2 - 2z  cos  +1 

We  know  that 

Z{a n} = z /(z -a), if |z|  > |a| 

Letting  a =  e i, we  have 

z z

Z{e in } = =

z-ei z–(cos   + isin )

z

Z{cosn  + isinn } =

(z –cos  ) - isin 

z {(z –cos  ) + isin }

=

{(z –cos  ) - isin } {(z –cos  ) + isin }

z (z –cos  ) + izsin 

=

z2 - 2z cos  +1 

Equating  the real  & imaginary  parts,  we  get 

z (z  - cos )

Z (cosn  ) = --------------------

z2 - 2z cos  +1 

z sin 

and 

Z (sinn  ) =

z2 - 2z cos  +1 

z (z  - rcos )

5 . Z{r n cosn  } = --------------------- and 

z2 – 2rz cos  +r 2

# MSAJCE  175 zr  sin 

Z{r n sinn } = --------------------- if  |z|>|r| 

z2 – 2rz  cos  +r 2

We  know  that 

Z{a n} = z /(z -a),  if  |z|>|a| 

Letting  a =  re i , we  have 

Z{r nein  } =  z /(z  -re  i) .

z

i.e,  Z{r n (cosn  + isinn ) } = -------------

z - re i

z

=

z – r(cos  + isin )

z {(z  - rcos ) +  i rsin }

=

{(z  – rcos ) – i rsin }{(z  – rcos ) + i rsin }

z (z  - rcos ) + i rzsin 

=

(z  – rcos )2 +r 2 sin 2

z (z  - rcos ) + i rzsin 

=

z2 – 2rz cos  +r 2

Equating  the  Real  and Imaginary  parts,  we  get 

z (z - rcos )

Z{r n cosn } = ------------------------ and 

z2 – 2zrcos  + r2

zrsin 

Z{r n sinn } = ------------------------; if  | z | > |  r |

z2-2zrcos  + r2

Table  of  Z – Transforms 

fn F(z) 

z

---------

z – 1

1.  1

# MSAJCE  176 z

---------

z + 1

z

---------

z – a

z

-----------

(z –1) 2

z2 + z

-------------

(z –1) 3

2.  (-1) n

3.  an

4.  n

5.  n2

2z 

----------

(z –1) 3

6.  n(n -1) 

k!z 

------------

(z –1) k+1 

7.  n(k) 

az 

8.  na n -----------

(z –1) 2

9.  cosn 

z (z -cos )

--------------------

z2 – 2zcos +1 

10.  sinn 

z sin 

--------------------

z2–2zcos  + 1

11.  rn cosn 

z (z -rcos )

----------------------

z2–2rz  cos  + r2

12.  rn sinn 

rz  sin 

----------------------

13.  cos(n /2) 

z2–2rzcos  +r 2

z2

------------

z2 + 1

# MSAJCE  177 z

14.  sin(n /2)  ------------

z2 + 1

Tz 

15  t -----------

(z –1) 2

T2 z(z +  1) 

------------------

(z –1) 3

16  t2

z

-----------

z – eaT 

17  eat 

z

-----------

z – e-aT 

18  e-at 

19  Z{cos t} 

z (z  - cos T) 

----------------------

z2 - 2z  cos T +1 

20  Z{sin t }

z sin T

----------------------

z2 - 2z  cos T +1 

zeaT  (z eaT  – cos  bT) 

--------------------------------

z2e2aT  – 2z eaT  cos  bT  +1 

zeaT  sin  bT 

--------------------------------

z2e2aT  – 2z eaT  cos  bT  +1 

21  Z{ e –at  cos  bt} 

22  Z{ e –at  sin  bt} 

# MSAJCE  178 Example  2

Find  the  Z– transform  of 

(i) 

(ii) 

(iii) 

n(n -1) 

n2 + 7n +  4

(1/2)(  n+1)(n+2) 

(i)  Z { n(n -1)}=  Z {n 2} – Z {n} 

z (z+1)  z

= -

(z -1) 3 (z -1) 2

z (z+1)  – z (z -1) 

=

(z  – 1) 3

2z 

=

(z -1) 3

(iii)  Z{  n2 + 7n  + 4}= Z{n 2} +  7 Z{n}+  4 Z{1} 

z (z+1)  z z

= + 7 + 4

(z -1) 3 (z -1) 2 z - 1

z {(z+1)  + 7(z -1)  + 4(z -1) 2}

=

(z  – 1) 3

2z(z 2-2) 

=

(z -1) 3

(n+1)  (n+2) 

(iii)  Z ----------------

2

1

= ------{ Z{n 2} +  3Z{n}+2Z{1}} 

2

1 z(z+1)  3z  2z 

= + + if  |z  | > 1

2 (z -1) 3 (z -1) 2 (z -1) 

2 (z  – 1) 3

2 (z  – 1) 3

# MSAJCE  179 z3

=

(z -1) 3

Example  3

Find  the  Z- transforms  of  1/n  and 

.

1/n(n+1)  

> 

11

(i  ) Z ----- =  ------- z-n

n n=1  n

1 1 1

= ----- + ------ + -------- + . . .  .

z 2z 2 3z 3

= - log  (1  – 1/z  ) if  |1/z|  < 1

= - log  (z -1 / z) 

= log (z/z -1), if  | z | >1. 

1 1 1

(ii)  Z = Z -

n(n+1)  n n+1  

> 

1 1

=  ----- z-n   ------ z-n 

> n=1 n=0

n n+1 

z

= log  ------

z-1

1 1

 1+  ------- + ------- + . .  .

2z  3z 2

z 2

1 1 1 1 1 3

= log   z + +

z 2 z 3 z

+ . . .

z-1

z

= log  ------

z-1

 z { - log (1  – 1/z)} 

z

= log  ------

z-1

 z log  (z/z -1) 

= (1 - z)  log  {z/(z -1)} 

# MSAJCE  180 Example  4

Find  the  Z- transforms  of 

(i)  cos  n/2 

(ii)  sin  n/2  

> 

n

(i)  Z{cos  n/2}  =  cos  ------ z-n 

> n=0

2

1 1

= 1  ------ + ------  …………….. 

z2 z4

> -1

1

= 1 + ------

z2

z2 + 1 -1

=

z2

z2

= ---------- , if  | z | > |

z2 + 1 

> 

n

(ii)  Z{sin  n/2}  =  sin  ------ z-n 

> n=0

2

1 11

= -----  ------ + ------  . . . . . .  . . . .  .

z z3 z5

1 1 1

= 1 - + - . . .

z z2 z4

1 1 -1

= 1 +

z z2

1 z2 +1  -1

=

z z2

# MSAJCE  181 1 z2 z

= =

z z2 + 1 z2 + 1

Example  5

Show  that  Z{1/  n!}  = e1/z  and  hence  find  Z{1/ (n+1)!}  and  Z{1/  (n+2)!}  

> 

11

Z ------- =  ------ z-n

n!  n=0  n!  

> 

(z -1)n

=  --------- 

> n=0

n! 

z-1 (z -1)2

= 1 +  ------- + --------- + . .  .

1!  2! 

> -1

= e z = e1/z 

1

Z --------

(n+1)! 

To  find 

We  know  that  Z{f n+1 } = z {  F(z)  – f0}

Therefore, 

1

Z --------

(n+1)! 

1

= z Z ----- – 1

n! 

= z { e 1/z  -1} 

Similarly, 

1

Z --------

(n+2)! 

= z2 { e 1/z  -1 – (1/z)}. 

Example  6

Find  the  Z- transforms  of  the  following 

(i)  f(n)  = n, n  > 0

0, n<  0

(ii)  f (n)  = 0,  if  n > 0

1, if  n < 0

# MSAJCE  182 (iii)f(n)  = an / n!,  n > 0

0,  otherwise 

> 

Z{f(n)}  =  f (n)  z –n

> n=0

(i  )

> 

=  n z  –n

> n=0

= (1  / z)  + (2/  z2) + ( 3/  z3) + . . .

= (1 / z) {1+  (2/z) +  (3/z 2) + . . .} 

= (1/z){  1 – (1/z)} -2

> -2

z-1

= 1/z  ------

z

= z /  (z -1) 2, if  |z  |>  |

> 

Z{f(n)}=   f (n)  z –n   

> n=-

(ii) 

> 

=  z –n   

> n=-

z n

> 

=    

> n=0
> 

= (1/1  – z), if  | z | < 1. 

an

(iii)  Z{f(n)}  =  f (n)  z –n =  ------ z –n   

> n= 0n=0

n! 

> 

= 

> n=0

(az -1)n

n! 

> -1

= eaz  = e a/z 

Example  7

2z 2 + 3z  +12 

If  F(z)  = --------------------- , find  the  value  of  „f 2‟ and  „f 3‟. 

(z -1) 4

2z 2 + 3z  +12 

# MSAJCE  183 Given  that  F(z)  = ---------------------.

(z -1) 4

This  can  be  expressed  as 

1 2 + 3z -1 +12z -2

F(z)  = .

z2 (1 - z-1)4

By  the initial  value theorem,  we  have 

fo = ℓt  F(z)  = 0. 

> z-

Also,  f1 = ℓt  {z[F(z)  - fo]}  = 0. 

> z-

Now,  f2 = ℓt  {z 2 [F(z)  - fo – (f 1 /z)]} 

> z-

2 + 3z -1 +12z -2

= ℓt 

> z-

= 2. 

- 0 – 0. 

(1 - z-1)4

and  f3 = ℓt  {z 3 [F(z)  - fo – (f 1 /z)  – (f 2/ z2)]} 

> z-

2 + 3z -1 +12z -2 2

= ℓt 

> z-

z3 –

(1 - z-1)4 z2

11z 3 + 8z  -2

= ℓt  z3 ---------------------.Given  that  = 11.  

> z-

z2 (z -1) 4

5.4  Inverse  Z – Transforms 

The  inverse  Z – transforms can be  obtained by  using  any  one  of the  following 

methods.They  are 

I. 

II. 

III. 

IV. 

Power  series  method 

Partial  fraction  method 

Inversion  Integral  method 

Long  division  method 

# MSAJCE  184 I.  Power  series  method 

This  is  the  simplest  method  of  finding  the  inverse  Z –transform.  Here  F(z)  can 

be  expanded  in  a series  of  ascending  powers  of  z -1 and  the  coefficient  of  z –n will  be  the 

desired  inverse  Z- transform. 

Example  8

Find  the  inverse  Z – transform  of  log  {z /(z+1)}  by  power  series  method. 

1 1 / y

Putting  z = -------, F (z) =  log  --------------

y (1  / y) +  1

1

= log 

1+y 

= - log  (1+y) 

y2 y3

= - y + -------- - --------- + . . .  . .  .

2 3

1 1 (-1) n

II.  Partial  Fraction  Method 

Here,  F(z)  is  resolved  into  partial  fractions  and  the  inverse  transform  can  be  taken 

directly. 

Example  9

z

Find  the  inverse Z  – transform  of  ------------------

z2 + 7z  + 10 

z

Let  F (z)  = -------------------

z2 + 7z  + 10 

= -z-1 + ------ z –2 - ------ z-3 + .  . .  . . +-------- z-n

2 3 n

0,  for  n =  0

Thus,  fn =

(-1) n / n ,  otherwise 

# MSAJCE  185 F(z)  1 1

Then  = =

z z2 + 7z  + 10  (z+2)  (z+5) 

1 A B

Now  , consider  = +

(z+2)  (z+5)  z + 2 z + 5

1 1 1 1

= -

3 z +2  3 z +5 

1 z 1 z

Therefore,  F (z)  = -------

3

-------- - -------

z +2  3

----------

z+5 

Inverting,  we  get 

1 1

= ------- (-2) n - ------ (-5) n

3 3

Example  10 

8z 2

---------------------

(2z –1)  (4z –1) 

Find  the  inverse  Z – transform  of 

8z 2 z2

Let F  (z)  = =

(2z –1)  (4z –1)  (z – ½ ) (z  – ¼) 

F (z)  z

Then  =

z (z – ½ ) (z  – ¼) 

z A B

Now,  = +

(z – ½ ) (z  – ¼)  z– ½ z – ¼

F (z)  2 1

We  get,  = 

z z– ½ z – ¼

# MSAJCE  186 z

F (z) =  2 -----------

z– ½

z

 -----------

z – ¼

Therefore, 

Inverting,  we  get 

z z

fn = Z –1{F(z)}=  2 Z-1 -----------  Z-1 -----------

z– ½ z – ¼

i.e,  fn = 2 (1  / 2) n – (1 / 4) n , n = 0, 1, 2, . . . . .  .

Example  11 

4- 8z -1 + 6z -2

-------------------

(1+z -1) (1 -2z -1)2

Find  Z-1 by  the method of partial  fractions. 

4- 8z -1 + 6z -2

Let  F(z)  =

(1+z -1) (1 -2z -1)2

4z 3 - 8z 2 + 6z 

=

(z  + 1)  (z  - 2) 2

F(z) 

Then  ----- =

z

4z 2 - 8z  + 6 A B C

-------------------- = ------- + --------- + --------, where  A =  B = C = 2. 

(z  + 1)  (z  - 2) 2 z+1  z-2 (z -2) 2

F(z)  2 2 2

So  that  = + +

z z+1  z-2 (z  -2) 2

2z  2z  2z 

Hence,  F(z)  = ------- + --------- + ----------

z+1  z-2 (z  -2) 2

Inverting,  we  get 

fn = 2( -1) n + 2(2) n + n.2 n

i.e,  fn = 2( -1) n + (n+2)2 n

# MSAJCE  187 C

2i C (z -1)(z -2)  2i (z -1)(z -2) 

Inversion  Integral  Method  or  Residue  Method 

The  inverse  Z-transform of  F (z) is  given by  the  formula 

1

fn = ------  F(z) z  n-1 dz 

2i C

= Sum  of  residues  of  F(z).z n-1 at  the  poles  of  F(z)  inside  the  contour  C which  is 

drawn  according  to  the given  Region  of  convergence. 

Example  12 

Using  the  inversion  integral  method,  find  the  inverse  Z-transform  of 

3z 

(z -1)  (z -2) 

3z 

Let  F(z)  = ---------------.

(z -1)  (z -2) 

Its  poles  are  z = 1,2  which  are  simple  poles. 

By  inversion  integral  method,  we  have 

1

fn = ------  F(z).  z n-1 dz  = sum  of  resides  of  F(z).  z n-1 at  the  poles  of  F(z). 

2i C

1 3z  1 3z n

i.e,  fn = ------  -------------. z n-1 dz  = ------  ------------- dz  = sum of  residues 

(1). 

Now, 

3z n

(z -1).  ------------- = -3

(z -1)(z -2) 

Residue  (at  z =1)  = ℓt 

> z-1

3z n

Residue  (at  z =2)  = ℓt  (z -2).  -------------- = 3.2  n 

> z2

(z -1)(z -2) 

Sum of  Residues =  -3 + 3.2 n = 3  (2 n-1). 

Thus  the  required  inverse  Z-transform  is 

fn = 3(2 n-1),  n = 0,  1,  2,  …

# MSAJCE  188 Example  13 

z(z+1) 

Find  the  inverse  z-transform  of  ----------- by  residue  method 

(z -1) 3

z(z+1) 

Let  F(z)  = -----------

(z -1) 3

The  pole  of  F(z)  is  z =  1,  which  is a  pole  of  order  3. 

By  Residue  method,  we  have 

1

fn = --------  F(z).  z n-1 dz  = sum  of  residues  of  F(z).z  n-1 at  the  poles  of  F(z) 

2i C

1 z+1 

i.e.,  fn = --------  z n . -------- dz  = sum of residues  .

> C

2i (z -1) 3

1

Now,  Residue  (at  z =  1) =  ----

2! 

d2

ℓt  ------ ( z  -1) 3

zn(z+1) 

-----------

(z -1) 3z1 dz 2

d2

1

= ---- ℓt  ----- { z n ( z  +1)} 

2!  z1 dz 2

d2 

> z1

dz 2

1

= ---- ℓt  ----- { zn+1  + zn)} 

2! 

1

= ----

2

ℓt  { n(n+1) z  n-1 + n(n -1) z  n-2 }

> z1

1

= ---- { n(n+1)  + n (n -1)}  = n2

2

Hence,  fn = n2, n=0,1,2,….. 

IV.  Long  Division  Method 

If  F(z)  is  expressed  as  a ratio  of  two  polynomials, namely, F(z)  = g(z -1) / h(z -1), 

which  can  not  be  factorized,  then  divide  the  numerator  by  the  denominator  and  the 

inverse  transform  can  be  taken  term  by  term  in  the  quotient. 

Example  14 

# MSAJCE  189 1+2z -1

Find  the  inverse  Z-transform  of  --------------------, by  long  division  method 

1-z-1

1+2z -1

Let F  (z)  =

1-z-1

By  actual  division, 

1+3z -1 +3z -2+3z -3

1 – z -1 1 +  2z -1

1 – z -1

+3z  -1

3z -1 – 3z -2

+ 3z  -2

3z  -2 – 3z -3

+ 3z  -3

3z  -3 – 3z  -4

+3z  -4

Thus  F(z)  = 1 + 3z -1 + 3z -2 + 3z -3 + . . . .  . .

Now,  Comparing  the  quotient  with 

> 

 fnz-n = fo + f1z-1 + f 2z-2 + f3z-3 + . .  . . .  .

> n=0

We  get the  sequence  fn as  f0 = 1, f 1 = f2 = f3 = . . . .  . . =  3. 

Hence  fn = 1,  for  n =  0

3,  for  n > 1

Example  15  z

------------

z2 – 3z  +2 

Find  the  inverse  Z-transform  of 

# MSAJCE  190 By  actual  division 

z -1 + 3z  -2 + 7z  –3 + ... ...  ... 

1-3z -1 + 2z -2 z-1

z -1 - 3z  -2 + 2z  –3

3z -2 – 2z  -3

3z -2 – 9z  –3 + 6z  -4

7z  -3 – 6z  –4

7z  -3 – 21z  –4 + 14z -5

+15 z  -4 – 14z  –5

 F(z)  = z -1 + 3z  -2 + 7z  –3 + ... ...  ... 

Now  comparing  the quotient  with 





n=0 

f n z –n = f0 + f1 z-1 + f2 z-2 + f3 z –3 + ..  .. 

We  get the  sequence  fn as  f0 = 0, f 1 = 1, f 2 = 3, f 3 = 7, .... ...  .... 

Hence,  fn = 2n-1,  n = 0,  1,  2,  3,  ... 

Exercises 

1.  Find  Z-1 {4z  / (z -1) 3} by  the long  division  method 

z (z 2 – z + 2) 

2.  Find  Z-1 ------------------- by  using Residue  theorem 

(z+1)  (z -1) 2

z2

------------------- by  using Residue  theorem 

(z+2)  (z 2+4) 

3.  Find  Z-1

4.  Find  Z-1 (z/z -a)  by  power  series  method 

5.  Find  Z-1 (e -2/z ) by  power  series  method 

# MSAJCE  191 Proof   

We  have  F (z) =   fn z-n, G (z) =   gnz-n 

> n=0 n=0

 F(z) .G  (z)  = (f 0 + f1z-1 + f2z-2 + ...  + fnz-n + ...  ).  (g o + g1z-1 + g2z-2 + ...+  gnz-n+

... )

> 

=  (f ogn+f 1gn-1+f 2gn-2+ . . .+  fngo)z -n

> n=0

= Z (f ogn+f 1gn-1+f 2gn-2+ . . .+  fngo)

> n

= Z  fm gn-m

> m=0

= Z {f n * gn}

Hence,  Z-1 { F(z)  . G(z)}  = fn * gn

Example  16 

Use  convolution  theorem to  evaluate 

z2

Z-1

(z -a)  (z -b) 

We  know  that  Z-1 {F(z).  G(z)}  = fn*g n.

z z

Let  F (z) =  ---------- and  G (z)  -----------

z-a z-b

z z

Then  fn = Z-1 ---------- = an & g n = Z-1 ----------- = bn

z-a z-b

z3 – 20z 

6.  Find  Z-1 ---------------- by  using  Partial fraction  method 

(z -4)  (z -2) 3

5.5  CONVOLUTION  THEOREM 

If  Z-1{F  (z)}  = fn and  Z-1{G(z)}  = gn, then 

> n

Z-1{F(z).  G(z)}  =  fm. gn-m = fn*  gn, where  the  symbol  * denotes  the  operation  of 

> m=0

convolution. 

# MSAJCE  192 Now, 

Z-1 {F(z).  G (z)}  = fn * gn = an * bn

n

bn-m

=  am

> m=0

which  is  a G.P.  

> n

a m

= bn  ------- 

> m=0

b

(a/b)  n+1  - 1

(a/b)  – 1

= bn

z2 an+1  – bn+1 

ie,  Z-1 =

(z -a)  (z -b)  a–b

Example  17  3

Find  z-1 by  using  convolution  theorem 

z

--------

(z -1) 

z2 z

Let  F (z) =  ---------- and  G (z)  -----------

(z -1) 2 (z -1) 

Then  fn = n+1  & gn = 1

By  convolution  Theorem,  we  have 

> n

Z-1 { F(z).  G (z)  } =  fn * gn = (n+1)  * 1  =  (m+1)  . 1

> m=0

(n+1)  (n+2) 

=

2

Example  18 

Use  convolution  theorem to  find  the  inverse Z - transform  of 

1

[1  – (1/2)z  –1] [1 - (1/4)z -1]

# MSAJCE  193 Given  Z-1 - = Z-1

[1  – (1/2)z  –1] [1 - (1/4)z -1]

z

[z -(1/2)]  [z  – (1/4)] 

z

Let  F (z) =  -------------- & G (z)  = -------------

z – (1/2)  z – (1/4) 

Then  fn = (1/2) n & gn = (1/4) n.

We  know  that  Z-1{ F(z).  G(z)}  = fn * gn

= (1/2) n * (1/4) n

> n

= 

> m=0
> m

1 1 n - m

2 4

1 1 m 1 -m

=

4 

> nn

 

> m=0

2 4

1 n

> n

= ------  2 m

4 m=0 

1 n

= ------ { 1+2+2 2+ . . . +  2n} which is a  G.P 

4

1 n 2n+1  - 1

=

4 2-1

> n

1

= ------ {2 n+1  – 1} 

4

1 1 n

= -

2n-1 4

1 1 1

 Z-1 = -

[1  – (1/2)z  –1] [1 - (1/4)z -1] 2 n-1 4 n

1 z2

# MSAJCE  194 5.6  Application  of  Z - transform  to  Difference  equations 

As  we  know,  the  Laplace  transforms  method  is  quite  effective  in  solving  linear 

differential  equations,  the  Z - transform  is  useful  tool  in  solving  linear  difference 

equations .

To  solve  a difference  equation,  we  have  to  take  the  Z - transform  of  both  sides  of 

the  difference  equation  using  the  property 

Z{f n+k }=  zk{ F(z)  – f0 – (f  1 / z ) - … - ( fk-1 / zk-1) } (k  > 0) 

Using  the  initial  conditions,  we  get  an algebraic  equation  of  the  form  F(z)  = (z). 

By  taking  the  inverse  Z-transform,  we  get  the  required  solution f n of  the given  difference 

equation. 

Exmaple  19 

Solve  the  difference equation  yn+1  + y n = 1,  y0 = 0,  by  Z - transform  method. 

Given  equation  is  yn+1  + yn = 1 ---------- (1) 

Let  Y(z)  be  the  Z -transform  of  {y n}. 

Taking  the  Z - transforms  of  both  sides  of  (1),  we  get 

Z{y n+1 } + Z{y n} =  Z{1}. 

ie,  z {Y(z)  - y0} + Y(z)  = z /(z -1). 

Using  the  given  condition,  it  reduces  to 

z

(z+1)  Y(z)  = --------

z - 1

z

# MSAJCE  195 i.e,  Y(z)  =

(z  - 1)  (z  + 1) 

1 z z

or  Y(z)  = -

2 z - 1 z + 1

On  taking  inverse  Z-transforms,  we  obtain 

yn = (1/2){1  - (-1) n}

Example  20 

Solve  yn+2  + yn = 1,  y0 = y1 = 0 ,  using  Z-transforms. 

Consider  yn+2  + yn = 1 ------------- (1) 

Taking  Z- transforms  on  both  sides,  we  get 

Z{y n+2 }+  Z{y n} = Z{1} 

y1 z2

z {Y(z)  - y0 - ------ } + Y(z)  = ---------

z z - 1

z

(z 2 + 1)  Y(z)  = -----------

z - 1

z

or  Y(z)  =

(z  - 1)  (z 2 + 1) 

Y(z)  1 A Bz  + C

Now,  = = +

z (z -1)(z 2+1)  z-1 z2+1 

1 1 z 1

= - 

2 z - 1 z2 + 1 z2 + 1

1

Y(z)  = -----

2

z z2 z

 ----------

z2  + 1

Therefore,  ------- - --------

z - 1 z2  + 1

# MSAJCE  196 Y(z)  1

Therefore,  -------- = ----------------

z (z -2)(z+3) 2

1 1 1 1

ie,  = - - ,

z

Y(z)  1 1

25  z-2 25  z+3  5 (z+3) 2

using  partial  fractions. 

1

Y(z)  = ------

25 

z z

-------  -------

z-2 z+3 

5z 

 --------

(z+3) 2

Or 

On  taking  Inverse  Z-transforms,  we  get 

Using  Inverse  Z-transform,  we  get 

yn =(½){1  - cos  (n  / 2)  - sin  (n  / 2)}. 

Example  21 

Solve  yn+2  + 6y n+1  + 9y n = 2n, y0 = y1 = 0,  using  Z-transforms. 

Consider  yn+2  + 6y n+1  + 9y n = 2n -------- (1) 

Taking  the  Z-transform  of  both  sides,  we  get 

Z{y n+2 } + 6Z{y n+1 } + 9Z{y n} = Z {2 n}

y1 z

i.e,  z2 Y(z) -y0 - ------ + 6z {Y(z)  - y0} + 9Y(z)  = --------

z z – 2

z

(z 2 + 6z  + 9) Y(z)  = --------

z - 2

i.e, 

(z -2)  (z+3) 

z

Y(z)  = ----------------

> 2

# MSAJCE  197 yn = (1/ 25){ 2 n - (-3) n + (5/3) n  (-3) n}. 

Example  22 

Solve  the  simultaneous  equations 

xn+1  - yn = 1;  yn+1  - xn = 1 with  x (0)  = 0;  y (0) =  0. 

The  given  equations  are 

xn+1  - yn = 1,  x0 = 0 ------------- (1) 

yn+1  - xn =1,  y0 = 0 -------------- (2) 

Taking  Z-transforms,  we  get 

z

z {X(z)  - x0} – Y(z)  = --------

z-1

z

z {Y(z)  - y0} – X(z)  = --------

z-1

Using  the  initial  conditions,  we  have 

z

z X(z)  – Y(z)  = --------

z-1

z

z Y(z)  – X(z)  = --------

z-1

Solving  the  above equations,  we  get 

z

X(z)  = -------- and 

(z -1) 2

z

Y(z)  = --------.

(z -1) 2

On  taking  the  inverse  Z-transform of  both  sides,  we  have  xn = n and  yn = n  ,

which  is  the  required  solution  of  the  simultaneous  difference  equations. 

Example  23 

Solve  xn+1  = 7x n + 10y n ; yn+1  = xn + 4y n, with  x0 = 3,  y0 = 2

Given  xn+1  = 7x n + 10y n

yn+1  = xn + 4y n

------------- (1) 

------------- (2) 

# MSAJCE  198 Taking  Z- transforms  of  equation(1),  we  get 

z {  X(z)  - x0} = 7 X(z) +  10  Y(z) 

(z  - 7)  X(z)  – 10  Y(z)  = 3z  ----------(3) 

Again  taking  Z- transforms  of  equation(2),  we  get 

z {Y(z)  - y0} =  X(z)  + 4Y(z) 

-X(z)  + (z  - 4)Y(z)  = 2z  ---------- (4) 

Eliminating  „x‟  from  (3)  & (4),  we  get 

2z 2 - 11z  2z 2 - 11z 

Y(z)  = =

z2 - 11z+8  (z -9)  (z -2) 

Y(z)  2z  - 11  A B

so  that  ---- = ---------------- = ------- + ------- ,where  A =1 and  B = 1. 

z (z -9)  (z -2)  z-9 z-2

Y(z)  1 1

ie,  = +

z z - 9 z – 2

z z

ie,  Y(z)  = +

z - 9 z – 2

Taking  Inverse  Z-transforms,  we  get  yn = 9n + 2n.

From  (2),  xn = y n+1  - 4y n = 9n+1  + 2n+1  - 4 (9 n + 2n)

= 9.9 n + 2.2 n - 4.9 n - 4.2 n

Therfore,  xn = 5.9 n - 2.2 n

Hence  the  solution  is  xn = 5.9 n - 2.2 n and  yn = 9n + 2n.

Exercises 

Solve  the  following  difference  equations  by  Z – transform  method 

# MSAJCE  199 1.  yn+2  + 2y n+1  + yn = n,  y0 = y1 = 0

## 2. yn+2  –yn =2n, y0 =0,  y1 =1

## 3. un+2  –2cos un+1 +un=0, u0 =1, u1 =cos 

## 4. un+2 =un+1  +un,u0 =0, u1 =1

## 5. yn+2  –5y n+1 + 6y n =n(n -1), y0 =0,  y1 =0

## 6. yn+3  –6y n+2  +12y n+1  –8y n =0, y0 =-1, y1 =0, y2 =1

## 5.7  FORMATION OF DIFFERENCE EQUATIONS 

## Example 

## Form the difference equation 

yn (8   8)  1(4 yn1  2yn2 ) 1(4 yn1  2yn2 )  0

2 2 =0 

4 4

yn 1 1

yn1

yn2

yn  a2  b(2) n n 

> n1n1

yn1  a2  b(2) 

 2a2n  2b(2) n 

> n2n1

yn2  a2  b(2) 

 4a2n  4b(2) n

Eliminating  a and b  weget, 

# MSAJCE  200 16 yn  4yn2  0

4(  yn2  4 yn )  0

yn2  4yn  0

Exercise: 

1.  Derive  the  difference equation  form  yn  (A  Bn )( 3) n

2.  Derive the  difference  equation  form  Un  A2  Bn n

BIBLIOGRAPHY 

1.  Higher  Engineering  Mathematics  – Dr.B.S.  Grewal 

2.  Engineering  Mathematics  – Vol III  – P.  Kandasamy 

3.  Engineering  Mathematics -II  – T.Veerarajan 

4.  Higher  Engineering  Mathematics  – N.P.Bali  & others 

4.  Advanced  Mathematics  For  Engineering - Narayanan 

5.  Advanced  Engineering  Mathematics - C.Ray  & C.Barrett 

6.  Advanced  Engineering  Mathematics - Erwin  Kreyszig 

# MSAJCE  201 UNIT  –I

PARTIAL  DIFFERENTIAL  EQUATIONS 

1.  Explain  how  PDE  are  formed? 

PDE  can  be  obtained 

(ii) 

(i)  By  eliminating  the  arbitrary  constants  that  occur  in  the  functional  relation 

between  the  dependent  and independent  variables. 

By  eliminating  arbitrary  functions  from  a given  relation  between  the  dependent 

and  independent  variables. 

2.  From  the  PDE  by eliminating  the  arbitrary  constants  a & b from  z  ax   by  .

Given  z  ax   by 

Diff.  p.w.r.  to  x we  get,  x

 z  a i.e.,  p  a

Diff.  p.w.r.  to  y we  get,  y

 z  b i.e.,  q  b

Substituting in  (1)  we  get  z  px   qy  .

3.  From  the  PDE  by  eliminating  the  arbitrary  constants  a & b from  z  (x2  a2 )(  y2  b2 ) .

Given  z  (x2  a2 )(  y2  b2 ) ---------(1)  x

p 

 z  (2 x)(  y2  b2 )

# MSAJCE  202 p  y2  b2

2x ---------(2)  y

q 

 z  (2  y)( x2  a2 )

q  x2  a2

2y ---------(3) 

Substituting  (2) &  (3)  in  (1)  we  get  the  required  p.d.e. 

i.e.,  z   q  p   pq 

 2 y  2x  4xy   

4xyz   pq  .

4.  Eliminate  f from  z  f (x2  y2 ) .

Given  z  f (x2  y2 ) …(1) 

Diff  (1)  p.w.r.  to  x and  y we  get,  x

 z  f (x2  y2 )2x

p  f (x2  y2 )2xi.e.,  ...(2) 

 f (x2  y2 )2 y

 z

 y

q  f (x2  y2 )2yi.e.,  ...(3) 

(2)   p  x

## 3 q y

py   qx   0 .

# MSAJCE  203 5.  Obtain  PDE  from  z  f (sin  x  cos  y) .

Given  z  f (sin  x  cos  y) …(1) 

...(2) p

 x



 z  f (sin  x  cos  y)cos  x

...(3) q

 y



 z  f (sin  x  cos  y)sin  y

## 3

## 2  p  cos  x

q sin  y

psin  y   q sin  y

psin  y  q sin  y  0 .

 x

6.  Solve 

 z sin  x .

Given 

 x

 z sin  x

Integrating  w.r  to  x on  both  sides 

z  cos  x  c

But  z is  a function  of  x and  y

 z  cos  x  f ( y)

Hence  c  f ( y) .

# MSAJCE  204 7.  Mention  three  types  of  solution  of  a p.d.e  (or)  Define  general  and  complete  integrals  of  a

p.d.e. 

(i)  A solution  which  contains  as  many  arbitrary  constants  as  there  are  independent 

variables  is  called  a complete  integral  (or)  complete  solution. 

(ii)  A solution  obtained  by  giving  particular  values  to  the  arbitrary  constants  in  a

complete  integral  is  called  a particular  integral  (or)  particular  solution. 

(iii)A  solution  of  a p.d.e  which  contains  the  maximum  possible  number  of  arbitrary 

functions  is  called a  general integral  (or)  general  solution. 

8.  Solve  p  q  1

Given  p  q  1

This is  of  the  form  F(p,q)  = 0. 

Hence  the  complete  integral  is  z  ax   by   cz  .

where,  a  b  1,  b 1 a

b  (1  a)2

Therefore  the  complete  solution  is 

z  ax   (1  a)2 y  c --------- (1) 

Diff.p.w.r.  to  c we  get, 

0  1

There  is  no  singular  integral. 

Taking  c  f a when f  is  arbitrary. 

z  ax   (1  a)2 y  f (a) --------- (2) 

# MSAJCE  205 Diff.  p.w.r.to  'a '

0  x  2(1  a)  1  y  f (a)2 a  --------- (3) 

Eliminating  'a ' between  (2)  & (3)  we  get the  general  solution. 

9.  Find  the  complete  integral  of  z  px   qy   p2  q2 .

Given  z  px   qy   p2  q2 .

This  equation  is  of  the  form  z  px   qy   f ( p, q) .

By  Clairaut’s  type,put  p  a, q  b .

Therefore  the  complete  integral  is  z  ax   by   a2  b2 .

10.  Find  the  complete  integral  of  q  2 px  .

Given  q  2 px  .

This equation  of  the  form  f (x, p, q)  0 .

Let  q  a , then 

a

2x .

p 

2x

But  dz   a dx   ady  .

2x

Integrating  on  both  sides, 

#  dz    a dx    ady  .

# MSAJCE  206 z  a log  x  ay   b .

2

11.  Find  the  complete  integral  of  pq   xy  .

Given  pq   xy  .

Hence  p  y .

x q

It  is  of  the  form  f (x, p) 

( y, q) .

Let  p  y  a .

x q

 p  ax  and  q  y .

a

Hence  dz   pdx   qdy  .

dz   axdx   y dy  .

a

Integrating  on  both  sides, 

x2 y2

z  a   c .

2 2a

2az=a 2 x2  y2  b is  the  required  complete  integral. 

12.  Solve  px   qy   z .

Given  px   qy   z --------- (1) 

This  equation  is  of  the  form  Pp   Qq   R

# MSAJCE  207 when  P  x, Q  y, R  z

The subsidiary  equations  are  dx   dy   dZ 

P Q R

ie.,  dx   dy   dZ 

x y z

> 1

i.e., 

Take 

x y

dx   dy 

x y

log  x log  y  log  c1

log  x log(  yc 1 )

x  yc 1

x  c

#  dx    dy 

y

u  x

y

> 2

i.e., 

dx   dz 

x z

x z

log  x log  z  log  c2

log  x log( zc 2 )

x  zc 2

Take 

#  dx    dz 

z

x  c

v  x

z

 y z 

 

Therefore  the  solution  of  the  given  p.d.e  is 

  x , x   0 .

13.  Solve  (D2  4DD  3D2 )z  0 .

Given  (D2  4DD  3D2 )z  0

The  auxiliary  equation  is  m2  4m  3  0

mm  31m  3  0

m  3 , m 1

The  roots  are  distinct. 

Hence  C.F 

1 y  x 

2 y  3x .

 z  C.F .

# MSAJCE  208 z 

1 y  x 

2 y  3x .

14.  Solve  2r  5s  3t  0.

Given  2r  5s  3t  0 .

The  given  differential  equation  can  be  written  as, 

2 z 2 z 2 z

2  5

x2 xy y2

 3  0 .

i.e.,  2D2  5DD   3D2 z  0 .

The  auxiliary  equation  is,  2m2  5m  3  0 .

2m2  6m  m  3 0

2mm  31m  3 0

## m  3 2m1  0

m   3 ,  m  1

2 

> 1

2

C.F 

 y  3x  f  y  1 x 

 

 

 z 

1 y  3x 

2 2y  x .

15.  Find  the  P.I  of  D2  DD z ex y .

Given  D2  DD z  ex y

ex y

P.I  1

D2  DD 

1

11 ex y  1 ex y .

0

P.I 

# MSAJCE  209 If  we replace  D by  1 and  D’  by  -1 we get  dr   0 .

P.I  ex yx

2D  D ex yx

211



.

 x ex y  xe x  y

1

16.  Find  the  P.I  of  D2  2DD   D2 z cos x  3y .

Given  D2  2DD   D2 z cos x  3y

cos x  3y 

D2  2DD   D2

 cos x  3y

1

P.I 

1 2(3)   9

16 

 1cos x  3y

.

PART -B

1.Solve  z  px   qy   1  p2  q2 .

Soln: 

Given:  z  px   qy   1  p2  q2

This  is  of  the  form  z=px+qy+f(p,q) 

Hence,  the  complete  integral  is  z  ax   by   1 a2  b2 ------------->(1) 

Where a  & b are  arbitrary  constant. 

To  Find  The  Singular  integral: 

Diff  (1)  p.w.r.to  a, 

(2 a)

2 1  a2  b2

We  get,  0  x  0  1

# MSAJCE  210 a  x 1  a 2  b2 ---------(2) 

Diff  (1)  p.w.r.to  b, 

(2 b)We  get,  0  y  0  1

2 1  a2  b2

b   y 1  a 2  b2 ---------(3) 

(1)=>  z  x2 1  a2  b2  y2 1  a2  b2  1  a2  b2

z  (1  x2  y 2 ) 1  a2  b2 ----------(4) 

(4)=>  z  (1   x2  y 2 ) 1

1  x2  y 2

z 2 1  x2  y2

x2  y2  z 2  1

Which  is  the  singular  solution. 

To  Get  the  general  integral: 

Put  b 

(a) in  (1)  , we  get 

z  ax  

(a) y  1  a2  [

(a)] 2 ---------------(5) 

Diff  (5)  p.w.r.to  a, we  get 

0  x 

'( a) y  2a  2(a)

'( a) -----------------------(6) 

2 1  a2  [

(a)] 2

Eliminate  a between  (5)  abd  (6)  to  get the  general  solution. 

2.Solve  y2p-xyq=x(z -2y) 

Soln: 

Given  y2p-xyq=x(z -2y) 

This equation  of  the  form  Pp+Qq=R 

# MSAJCE  211 Here, P=y 2 ,Q= -xy  , R=  x(z -2y) 

The  Lagrange’s  subsidiary  equation  are  dx   dy   dz 

P Q R

dy  dz 

y 2 

 xy  x(z  2 y)

\i.e,  dx  

Take  ,

 xy 

dx   dy 

y2

dy  dz 



 xy  x(z  2y)

y  x

dx   dy  dy   dz 

 y (z  2y)

xdx= -ydy  (z -2y)dy= -ydz 

#  x dx    y dy  z dy -2y  dy= -ydz 

cx2 y 2

 1

2 2 2

  ydz+zdy=2ydy 

x2+y 2=c 1  d ( yz )   2 y dy 

yz=y 2+c 2

v=yz -y2

u=x 2+y 2

Hence  the  general  solution  is  f(x 2+y 2 , yz -y2)=0. 

3.Solve:(3z -4y)p+(4x -2z)q=2y -3x 

Soln: 

Given:  (3z -4y)p+(4x -2z)q=2y -3x 

This equation  of  the  form  Pp+q=R 

Here,  P=  (3z -4y)  ,Q=(4x -2z)  , R=  2y -3x 

# MSAJCE  212 The  Lagrange’s  subsidiary  equation  are  dx   dy   dz 

P Q R

\i.e,  (3z  - 4y)  (4x  - 2z)  2y  - 3x 

dz dx  dy 

  --------------------(1) 

Use  Lagrangian  multipliers  x,y,z, 

We  get  the  ratio  in  (1) 

= (3z  - 4y)x+  (4x  - 2z)y   (2y  - 3x)z 

xdx   ydy   zdz  = xdx   ydy   zdz 

0

Xdx+ydy+zdz=0 

Integrating  we  get   x dx    y dy    z dz   0

x2

 y 2

 z 2

 a

2 2 2 2

i.e,  x2+y 2+z 2=a. 

Again  use  Lagrangian  multipliers  2,3,4, 

We  get  the  ratio  in  (1) 

= (6z  - 8y  -12x  - 6z   8y  -12x 

2dx   3dy   4dz  = 2dx   3dy   4dz 

0

2dx   3dy   4dz  =0 

Integrating,  we  get   2 dx   3dy    4dz   0

2x+3y+4z=b. 

Hence  the  general  solution  is, 

F(x 2+y 2+z 2 , 2x+3y+4z)=0. 

# MSAJCE  213 4.Find  the  general  solution  of  x(y 2-z2)p+y(z 2-x2)q=z(x 2-y2)

Soln; 

Given;  x(y 2-z2)p+y(z 2-x2)q=z(x 2-y2)

This  equation  of  the form  Pp+q=R 

Here,  P=  x(y 2-z2) ,Q=  y(z 2-x2) , R=  z(x 2-y2)

The  Lagrange’s  subsidiary  equation  are  dx   dy   dz 

P Q R

\i.e,  z(x 2 - y2 )x(y  2 - z 2 ) y(z 2 - x 2 )

dz dx  dy 

  --------------------(1) 

Use  Lagrangian  multipliers  x,y,z, 

We  get  the  ratio  in  (1) 

= x(y  2 - z 2 ) + y(z 2 - x 2 )  z(x 2 - y2 )

xdx   ydy   zdz  = xdx   ydy   zdz 

0

xdx+ydy+zdz=0 

Integrating  we  get   x dx    y dy    z dz   0

x2

 y 2

 z 2

 a

2 2 2 2

i.e,  x2+y 2+z 2=a. 

1 1 1Again  use  Lagrangian  multipliers  , , ,

x y z

We  get  the  ratio  in  (1) 

=

1 dx   1 dy   1 dz 

x y z

y2  z 2  z 2  x2  x 2  y 2

1 dx   1 dy   1 dz 

= x y z

0

1 dx   1 dy   1 dz  =0 

x y z

# MSAJCE  214 Integrating,  we  get   1 dx    1 dy    1 dz   0

x y z

logx  +logy+logz=log  b

Hence  the  general  solution  is, 

F(x 2+y 2+z 2 , logx  +logy+logz)=0. 

5.Solve:[D 3-2D 2D’]z=e x+2y +4sin  (x+y) 

Soln: 

Given:  [D 3-2D 2D’]z=e x+2y +4sin  (x+y) 

The  auxiliary  equation  is  m3-2m 2=0 

Replace  D by  m and  D’  by  1

m2(m -2)=0 

m=0,0  and  m=2 

C.F= 

1 (y)  x

2 (y) 

3 (y  2x)

ex  2y 

ex + 2y 

(1) 3 - 2(1) 2 (2) 

ex + 2y 

D3 - 2D 2 D' 

1

> 1

  1

3

Replace  D by  1and  D'  by  2

1

P.I 



# MSAJCE  215 1

i

 4 IP  (i(cos( x  y)  i sin  (x  y)) 

 4 cos  (x  y)

 4I.P e

 i  2i

1

 4I.P

Replace  D by  i and  D'  by  i

(i)3  2( i) 2 (i)

 I.P 4

D3  2D2 D'

1

1

 I.P 4

D3 - 2D 2 D' 

1   

> i(xy)

ei ( x y )

ei( x  y )

ei ( x y ) 

> 2

4 sin( x  y)P.I 

Hence  the  general  solution  is    

> 123

3

Z= 

 ( y)  x

 (y) 

 (y  2x)  1 ex2y   4cos  (x  y)

UNIT  II 

FOURIER  SERIES 

PART  – A

1.  Explain  periodic  function  with  examples. 

A function  f x is  said  to  have  a period  T if  for  all  x , f x  T  f x , where  T is  a

positive  constant.  The  least  value of  T  0 is  called the period  of  f x.

Example  : f x  sin  x ; f x  2

  sin  x  2

   sin  x .

Here  f x  f x  2

 . sin  x is  a periodic  function  with  period  2

 .

# MSAJCE  216 2.  State  Dirichlet’s  conditions  for  a function  to  be  expanded  as  a Fourier  series. 

Let  a function  f (x) be  defined  in  the  interval  c  x  c  2 with  period  2 and 

satisfies  the  following  conditions  can  be  expanded  as  a Fourier series  in  (c, c  2

) .

(i) 

(ii) 

(iii) 

(iv) 

f (x) is  a well  defined  function. 

f (x) is  finite  or  bounded. 

f (x) has only  a finite  number  of  discontinuous  point. 

f (x) has only  a finite  number  of  maxima  and  minima. 

3. State  whether  y  tan  x can  be  expressed  as  a Fourier  series.  If  so  how?. If  not  why? 

tan  x cannot  be  expanded  as  a Fourier  series.  Since  tan  x not  satisfies  Dirichlet’s 

condition. 

4.  State  the  convergence  condition  on  Fourier  series. 

(i)  The  Fourier  series  of  f (x) converges  to  f (x)

continuous. 

at  all  points  where  f (x) is 

(ii)  At  a point  of  discontinuity  x0 , the  series  converges  to  the  average  of  the  left  limit  and 

right  limit 

of  f (x) at  x0  

> 000

2  h0 h0 

f x  1  lim  f x  h lim  f x  h  .

5.  To  what  value  does  the  sum  of  Fourier  series  of  f (x) converge  at  the point  of  continuity 

x  a ?

The  sum  of  Fourier  series  of  f (x) converges  to  the  value  f (a) at  the  continuous  point 

x  a .

# MSAJCE  217 6.  To  what  value  does  the  sum  of  Fourier  series  of  f (x) converge  at  the  point  of 

discontinuity  x  a ?

At  the  discontinuous point  x  a , the  sum  of  Fourier  series  of  f (x) converges  to 

##      0 0 

> 0

2

 

h0 

 f x  h  f x  h 

f x  lim  .

7.  If  f (x)  x2  x is  expressed  as  a Fourier  series  in  2, 2, to  which  value  this  series 

converges  at 

x  2 ?. 

f (x)  x2  x,  2  x  2

The  value  to  which  the  Fourier  series of  f (x) converges at  x  2 which  is an  end  points 

is  given  by 

 f 2  f 2  4  2  4  2

2 2  2 .

 The Fourier  series  converges  at  x  2 to  the value  4. 

8.  If  f x  cos  x

 if  0  x 



50  if 

  x  2

 and  f x  f x  2

  for  all  x,  find  the  sum  of  the 

Fourier  series 

of  f x at  x 

 .

Sum  of  the  Fourier  series of  the  function  f x at  x 

 .

 cos 

  50 

22

 f 

  f 

  f 

   1 50   49  .

2 2

# MSAJCE  218 9.  If  f x  sinh  x is defined  in  

  x 

 , write  the value  of  a0 , an .

Given  f x  sinh  x

f x  sinh x  sinh  x

   f x.

 sinh  x is  an  odd  function. 

 a0  0,  an  0 .

10.  Write the  formulae for  Fourier  constants  for  f (x) in  the  interval  (

,

 ) .

The Fourier  constants for  f (x) in  the  interval  (

,

 ) are  given  by 

1 

> 

1

> 

a0 

##   f (x). dx  an 

##   f (x) cos  nx .dx  

> 
> 
> 

1

> 

bn 

##   f (x)sin  nx .dx  .

> 
> 

11. Find  the constant  a0 of  the Fourier  series  for function  f x x in  0  x  2

#  .

## 1 2 

> 

## 1 2

> 

## a0 

#   f (x)dx  

#   xdx   

> 00

2



 0  

1  x2 2 

> 

1  4

 2



  2  

   0  2



i.e.,  a0  2

 .

12.  If  f x = x expanded  as  a Fourier  series  in  (π, π) , find  a0.

# MSAJCE  219 The  given  function  f (x)  x is  an  even  function. 

> 0

1 

> 

1 

> 

2

> 

##  2

2  x2 

> 

## 

## 

##  

> 
> 

a  f (x)dx   x dx   xdx    

 0



##  .  

> 0

13.  Find  the  Fourier  coefficients  a0 of  f x  e in  

  x 

 .x

> 0
> x

1

> 



 

> 
> x



> 

a  e dx   e 

> 

#   e e



 

> 

 

> 

1   1  2sinh 

 .

14.  Find  bn in  the expansion  of  x2 as  a Fourier  series  in  

# ,

#  .

> n

Since  f (x)  x2 is  an  even  function,  the  value  of  b  0 .

15.  Find  the  constant  term  a0 in  the  Fourier  series  corresponding  to 

(π, π) .

f x = x  x3 in 

Given 

i.e, 

f x x  x3

f  x x  x3  x  x3   f x

f  x  f x

 f (x) is  an  odd function  in  

 ,

 

Hence  a0  0 .

16.  If  f x  x2  x4 is  expanded  as  a Fourier  series  in  l,l , find  the  value  of  bn .

# MSAJCE  220 Given  f x  x2  x4 ,  l  x  l

# f  x  x2   x4  x2  x4  f x

 f x is an  even  function  in  l,l.

Hence  bn  0 .





1+ 2x , -π <  x <  0

0 < x <  π

π

17.  In  the  Fourier  expansion  of  f ( x) = 

2x

π

1  ,

in  π,π , find  the  value  of 

bn the 

coefficient  of  sin  nx  .



 π < x < 0

π

2x

π

1  2x , 0 < x <  π

f ( x) = 

1  ,

 f x is an  even  function  of  x in  

,

 

The  coefficient  of  sin  nx  , bn  0 . Since  the  Fourier  series  of 

terms  only. 

f (x) consists  of  cosine 

18.  Find  the  constant  a0 of  the  Fourier  series  for  the  function 

π < x < π .

f x = x cos  x in 

f (x)  x cos  x

# MSAJCE  221 f (x)  x cos  x   f (x)

 f (x) is an  odd  function.  Hence  a0  0 .

19.  Write the  Fourier  sine  series  of  k in  0, 

##  .

The  Fourier  sine  series  is  given  by 

> 

f (x)  bn sin  nx 

> n1

where  bn =

1

> 

f (x)sin  nx .dx 

> 
> 

##   0

2

> 



 k sin  nxdx 

## 2k cos  nx  

> 

## 2k 

## n   1 (1) n

## n

#   

#   0 n

 4k

i.e.,  b  n , if  n is  even 



0,  if  n is  odd 

   

> nis odd

n

## 

f (x)  

 n1 (2 n 1) 

4k sin  nx  = 4k  1 sin[(2 n 1) x]

.

20.  Obtain  the sine  series  for  unity  in  (0,  π) .

> 

Here  f x1;  f (x)  bn sin  nx 

> n1

where  bn =

1

> 

f (x)sin  nx .dx 

> 
> 

##   0

2

> 



 1.sin  nx . dx 

## 2 cos  nx  

> 

## 2 

## n   1 (1) n

## n

#   

#   0 n

 4

i.e.,  b  n , if  n is  even 



0,  if  n is  odd 

# MSAJCE  222    

> nis odd

n



 n1 (2 n 1) 

> 

f (x)   4 sin  nx  = 4  1 sin[(2 n 1) x] .

21.  Find the  value  of  an , in the  cosine  series  expansion  of  f x  k in  the  interval  0,10 .

2 10 

> 0

n

 x

an  10   k cos  10  dx   k 

10  sin  n

  0  0 .

5  n

 n



 n

 x 10 

k sin  10  

 

5 

 

 10  0

22.  If  f x is  defined  in  3  x  3 what  is the  value of  Fourier  coefficients. 

1 3 1 3 1 3

> 3

a0  3  f xdx  ; ;

3 3

n

 x

> 3

an  3  f xcos  n

 x

> 3

bn  3  f xsin dx  dx  .

## R.M.S.,  y  a

## (b  a)

23. Define  Root  Mean  Square  value  of  a function. 

The  root  mean  square  value  of  y  f (x) in  (a, b) is  denoted  by  y . It  is  defined  as 

> b

#  y2dx 

.

24.  Find  the  R.M.S  value  of  y  x2 in  

,

 .

# MSAJCE  223 x2 2

dx 

> 5

10 



> 

 1  x 

2  5 

> 
> 
> 

y2  1

2

    

> 
> 42
> 2

5 5

 y 

 .



 1 

5 

 5  y 

25.  Find  the  R.M.S value  if  f ( x) = x2 in  π  x  π .

Since  R.M.S  y 

## y2dx 

## (b  a)

> b

# 

> a
> 22

## x dx 

> 



##   

## [

#   (

#  )] 



# 

## 

> 

#  x4dx 

> 
> 

2





 x5 

> 

 

 5 0



 

> 
> 

2 x4dx   x4dx  

> 00

2



 



 5

 2

5

  .

5

26.  State  the  Parseval’s  Identity  (or) theorem  on  Fourier  series. 

If  f (x) is  a periodic  function  of  period  2 in  (c, c  2

) with  Fourier  coefficients 

a0 , an and  bn , then    2 2 20

2

##    

1 c2

> 

#  n n

> n1

a2 

 (a  b )

> c

 f x  dx   .

27.  Write the  complex  form  of  Fourier series  for  f(x) defined  in  the  interval  (c, c+2 l). 

The  series  for  defined  in  the  interval f (x) (c, c  2

) and  satisfying  Dirichlet’s 

conditions  can  be  given  in  the  form  of 

# MSAJCE  224 inx 

> 

f (x)   cne

> n
> c2
> 

# 

> c

1

2

## n, where  c 

f (x)e inx dx  .

28.  What  do  you  mean  by  Harmonic  analysis? 

The  process  of  finding  the  Fourier  series  of  the  periodic  function  y  f x of  period 

2l or  2

 using  the  numerical  values  of  x and  y is  known  as  Harmonic  analysis. 

PART  B

1)  Express  f(x)=  as  a Fourier  series  with  period 

Hence  deduce  the  value  of  the  series 

to  be  valid  in  the  interval  0 to  .

Solution: 

We  know  that the  Fourier  series  be 

# MSAJCE  225 MSAJCE  226 Sub  in  (1) we  get 

# MSAJCE  227 Put  is  a point  continuity 

2)  Obtain  Fourier  series  for  f(x)  of  period 

Hence  deduce  that 

and  defined  as  follows 

and 

Solution: 

Given 

We  know  that  the  Fourier series  is 

Where 

# MSAJCE  228 MSAJCE  229 Substituting  the  values in  equation  (1)  we  get 

This  is  the  required  Fourier  series 

i)  Put  is  a point  of  continuity 

# MSAJCE  230 ii)  Put  is  a point  of  continuity 

# MSAJCE  231 Hence  proved 

ODD  AND  EVEN  FUNCTION 

3.  Find  the  Fourier  series  of 

Solution: 

Given 

Therefore  f(x)  is neither  even  nor  odd  function 

We  know  that  the  Fourier  series  is 

Where 

# MSAJCE  232 MSAJCE  233 Substituting  the  values in  equation  (1)  we  get 

# MSAJCE  234 This  is  the  required  Fourier  series. 

FOURIER  SINE  SERIES 

3)  Expand  in  a Fourier  sine  series  in  the  interval 

Solution: 

Given 

We  know  that  the  half  range  fourier sine  series  is 

Where 

# MSAJCE  235 Substituting  value  in  equation  (1)  we  get 

This is  the  required  half  range  Fourier  sine  series. 

HALF  RANGE  COSINE  SERIES 

4)  Obtain  the  half  range  cosine  series  for  in  the  interval  (0,2). 

olution: 

Given 

We  know  that  the  Fourier half  range  cosine  series  is 

# MSAJCE  236 Where 

Here 

Substituting  these  values in  equation  (1)  we  get 

This  is  the  required  Fourier  series 

# MSAJCE  237 COMPLEX  FORM  OF  FOURIER  SERIES 

6)  Find  the  complex  form  of  the  Fourier  series  of  = in  -1 < x ≤ 1

Solution: 

Given  = in  -1<x≤1 

We  know  that  the  Fourier series  is 

where 

Here  = 1 ,

# MSAJCE  238 HARMONIC  ANALYSIS 

7)Computeupto  first  harmonics  of  the  Fourier  series  of  f(x)  given  by  the  following table 

X 0 T/6  T/3  T/2  2T/3  5T/6  T

F(x)  1.98  1.3  1.05  1.3  -0.88  -0.25  1.98 

Solution: 

First and  last  value  are  same.  Hence  we  omit  the  last  value. 

When x  varies  from  0 to  T

varies  from  0 to 

We  know  that  the  Fourier series  is 

…..(1) 

x y

# MSAJCE  239 0 0 1.98  1.0  0 1.98  0

T/6  1.30  0.5  0.866  0.65  1.1258 

T/3  1.05  -0.5  0.866  -0.525  0.9093 

T/2  1.30  -1 0 -1.3  0

2T/3  -0.88  -0.5  -0.866  0.44  0.762 

5T/6  -0.25  0.5  -0.866  -0.125  0.2165 

Sum  4.5  1.12  3.013 

Substituting  the  above  value  in  equation  (1)  we  get 

This  is  the  required  Fourier  series 

# MSAJCE  240 UNIT  III 

APPLICATIONS  OF  PARTIAL  DIFFERENTIAL  EQUATIONS 

PART  – A

1. What  conditions  are  assumed  in  deriving  the  one  dimensional  wave  equation? 

The  wave  equation  is   a

2 y 2  2 y

t2 x2 .

In  deriving  this  equation  we make  the  following  assumptions. 

(i)  The  motion  takes  place  entirely  in  one  plane  i.e.,  XY  plane. 

(ii)  We  consider  only  transverse  vibrations  the  horizontal  displacement 

particles  of  the  string  is  negligible. 

of  the 

(iii)The  tension  T is  constant  at  all  times  and  at  all  points  of  the  deflected  string. 

(iv)T  is  considered  to  be  so  large  compared  with  the  weight  of  the  string  and  hence 

the  force of  gravity  is  negligible. 

(v)  The  effect  of  friction  is  negligible. 

(vi)  The  string  is  perfectly  flexible. 

2.  State  the  wave  equation  and  give  the  various  solutions  of  it? 

# MSAJCE  241 The  wave  equation  is   a

2 y 2  2 y

t2 x2 .

The  various  possible  solutions  of  this  equation  are 

(i)  y(x,t)  (A e px   A e px  )( A e pat   A e pat  ) .   

> 1234

(ii)  y(x,t)  (A5 cos  px   A6 sin  px )( A7 cos  pat   A8 sin  pat ) .

(iii)  y(x,t)  (A9 x  A10  )( A11 t  A12  ) .

3.  Find  the  nature  of  PDE  4u xx   4uxy   uyy   2ux  uy  0 .

This  is  of  the  form  Au xx   Bu xy   cu yy   f x, y,u,ux ,uy   0 .

Here  A  4,  B  4, C 1. 

B2-4AC=16 -4(4)(1)=0. 

Therefore  the  equation  is  Parabolic. 

1.  Classify  the equation  uxx -y4uyy =2y 3uy.

Solution: 

This  is  of  the  form  Au xx +Buxy+Cu yy +f(x,y,u,u x,u y)=0. 

Here  A=1, B=0,  C= -1. 

B2-4AC=0 -4(1)( -1)=4>0. 

Therefore  the  equation  is  Hyperbolic. 

2.  Classify:  x2uxx+2xyu xy +(1+y 2) uyy -2u x=0. 

Solution: 

This  is  of  the  form  Au xx +Buxy+Cu yy +f(x,y,u,u x,u y)=0. 

Here  A=x 2, B=2xy,  C=1+y 2.

B2-4AC=4x 2y2-4(x 2)(1+y 2)

# MSAJCE  242 = 4x 2y2-4 x2-4(x 2 y2)

=-4x 2<0. 

Therefore  the  equation  is  Elliptic. 

3.  A string  is  stretched  and  fastened  to  two  point  l apart.  Motion  is  started  by 

l

> 0

displacing  the  string  into  the  form  y  y sin 

x from  which  it  is  released  at  time 

t=0.  Formulate  this  problem  as  the  boundary  value  problem. 

Solution: 

The  displacement  y(x,t)  is  the  solution  of  the wave  equation. 

a

t2 x2

2 y  2  2 y

The  boundary  conditions  are: 

i)  y(0, t)  0 for  all  t  0 .

ii)  y(l,t)  0 for  all  t  0 .

t

iii)  y x,0   0 .

l

> 0

iv)  y(x,0)   f (x)  y sin 

x .

> 2

4.  What  is  the constant a  in  the  wave  equation  2 a

t x2

2 y  2  2 y

(or) 

In  the  wave  equation  t2 c x2

2 y  2  2 y 2

what does  c stand  for? 

# MSAJCE  243 Solution: 

M Mass  per  unit  length  of  the  string 

Tension 

a2 or  c2  T 

5.  State  the  suitable  solution  of  one  dimensional  heat  equation   a

t x2

u 2 2u .

Solution:  

> 22

u(x,t)  (Acos  px   B sin  px )ec p t .

6.  State  the  governing  equation  for  one  dimensional  heat equation  and  necessary 

conditions  to  solve  the  problem. 

Solution: 

The  one  dimensional  heat  equation  is  t x2

u 2  2u

 a where  u(x,t)  is  the 

temperature  at  time  t at  a point  distance  x from  the  left  end  of  the  rod. 

The  boundary  conditions  are 

> 1

i)  u(0, t)  k 0C for  all  t  0

> 2

ii)  u(l,t)  k 0C for  all  t  0

iii)  the  initial  condition  is  u(x,0)   f (x), 0  x  l .

7.  Write  all  variable  separable  solutions  of  the  one  dimensional  heat  equation 

a

u  2 2u

t x2 .

Solution:    

> 22
> 112

)C e   

> t
> x
> x

i)  u(x,t)  (A e  B e 

> 22

x  B sin 

ii)  u(x,t)  (A cos 

 x) C e 2 2  

> 2
> 
> t

# MSAJCE  244 iii)  u(x,t)  (A3 x  B3 )C3 .

8.  Write  down  the  diffusion  problem  in  one  dimension  as  a boundary  value  problem  in 

two  different  forms. 

Solution: 

 a

t x2

u 2 2u is  the  one  dimensional  heat  flow. 

Here  a2  k is  called  the  diffusivity. 

pc 

In  the  steady  state   0 .

dx 2

d 2u

9.  State  any  two  laws  which  are  assumed  to  derive  one  dimensional  heat  equation. 

Solution: 

i) 

ii) 

Heat flows  from  higher  to  lower  temperature 

The  rate  at  which  the  heat  flows  across  any  area  is  proportional  to  the  area  and 

to  the  temperature  gradient  normal  to  the  curve. This  constant  is 

proportionality  is known  as  the  thermal  conductivity  (k)  of  the  material.  It  is 

known  as  Fourier  law  of  heat  conduction. 

10.  Write  any  two  solutions  of  the  Laplace  equation  Uxx +U yy =0  involving  exponential 

terms  in x  or  y. 

Solution: 

i)  u(x, y)  (A e px   A e px  )( A cos  py   A sin  py  ) .   

> 1234

ii)  u(x, y)  (A cos  px   A sin  px )( A e py   A e py  ) .   

> 1234

11.  In  steady  state  conditions  derive  the  solution  of  one  dimensional  heat  flow  equation. 

Solution: 

The  PDE  of  unsteady  one  dimensional  heat  flow  is 

# MSAJCE  245  a

t x2

u 2 2u …..  (1) 

In  steady  state  condition,  the  temperature  u depends  only 

on  x and  not  on  t. 

Hence  u  0

t

Therefore  equation  (1)  reduces  to   0 .

 2u

x2

The  general  solution  is  u=ax+b,  where  a,  b are  arbitary. 

12.  Write  the  boundary  condition  and  initial  conditions  for  solving  the  vibration  of 

string  equation,  if  the  string  is  subjected  to  initial  displacement  f(x)  and  initial 

velocity  g(x). 

Solution: 

The  wave  equation  is   a

2 y 2  2 y

t2 x2 .

The  initial  and  boundary  conditions  are 

i)  y(0, t)  0 .

ii)  y(l,t)  0 .

t

iii)  y x,0   g(x) .

iv)  y(x,0)   f (x)

13.  Write  down  the  governing  equation  of  two  dimensional  steady  state  heat  equation. 

Solution: 

The  required  equation  is  x2 y2

 2u 2u

  0 .

# MSAJCE  246 14.  The  ends  A and  B of  a rod  of  length  10cm  long  have  their  temperature  distribution 

kept  at  20 oC and  70 oC.  Find  the  steady  state  temperature  distribution  of  the  rod. 

Solution: 

The  steady  state  equation  of  one  dimensional  heat  flow  is 

 0

dx 2

d 2u …..  (1) 

The  general  solution  of  equation  (1)  is  u(x)=ax+b  …..  (2) 

The  boundary  conditions  are  u(0)=20,  u( l)=70. 

Put  x=0  in  (2) we  get  u(0)=a(0)+b 

b=20 

Put  x= l in  (2) we  get  u( l)=a l+b 

70=  al+20 

al= 50 

a=  50/ l

Therefore  equation  (2)   u(x)=  50x/ l+20 

Here  l= 10  cm 

Therefore  u(x)=  50x/10+20 

u(x)=5x+20. 

15.  Write  down  the  different  solutions  of  Laplace  equation  in  polar  coordinates. 



 2 

 

 2

 r   0. 2 2r r 2u

r

Solution:   

> 4123

  C sin  p)i)  u(r,

)  (C r  C r )( C cos  pp  p

# MSAJCE  247 p  

> p
> 

ii)  u(r,

)  (C5 cos(  p log  r)  C6 sin(  p log  r)( C7 e  C8e )

iii)  u(r,

)  (C9 log  r  C10  )( C11 

  C12  ) .

16.  What  is  the  general  solution  of  a string  of  length  l whose  end  points  are  fixed  and 

which  starts  from  rest? 

Solution: 

l l

n

x n

at 

#  n

> 
> n1

y(x, t)  B sin  cos  .

17.  How  many  boundary  conditions  and  initial  conditions  are  required  to  solve  the  one 

dimensional  wave  equation? 

Solution: 

Two  boundary  conditions  and  two  initial  conditions  are  required. 

PART  B

1.A  string  is  stretched  and  fastened  to  two  points  x = 0 and  x=  l apart.  Motion  is  started  by 

displacing  the  string  into  the  form  y = k (l  x – x2 ) from  which  it is  released  at time  t=0.  Find 

the  displacement  of  any  point  on  the  sting at  a distance  of  x from  one  end at time  t. 

Solution:  The ODWE  ytt   c y2

> cc

Solution  : y(x,t)=  (Acos  px  +Bsin  px)(Ccos  pct  +Dsin  pct) 

Boundary  and  initial  conditions  are  (i)  y(0,t)  = 0 (ii)  y( l,t) =  0

(iii)  y t (x,0)=0  (iv)  y(x,0)=f(x), 0<  x < l .

Using  Boundary  and  initial  conditions: 

i)  y(0,t)  = 0,  put  x=0 

A(Ccos  pct  +Dsin  pct)=0   A=0 

# MSAJCE  248  Suitable  solution  y(x,t)=  Bsin  px  (Ccos  pct  +Dsin  pct) 

y( l,t)  = 0 , put  x= l

Bsin  pl (Ccos  pct  +Dsin  pct)=0  B  0 Bsin  pl =0 

ii) 

l

pl  = n

 p=  n



 Suitable  solution  y(x,t)=  Bsin  n

x (Ccos  n

ct  +Dsin  n

ct  )

l l l

iii)  y t (x,0)=0 

Bsin  n

x l

l n

c

(C( -sin  nct  ) +Dcos  nct  )

l l

Put  t=0  Bsin  n

x l

l n

c (Dcos0)=0  D=0 

l

 Suitable  solution  y(x,t)=  Bsin  n

x Ccos  n

ct 

l

sin  nx cos  n

ct 

> n
> 

General  solution:  y(x,t)= B

> n1

iv)  y(x,0)=f(x),  0<  x < l .

l l

Here  t=0  n1 l

n

x 2 

> 

# Bn sin  = f(x)=  k lx   x

By  Half  range  sine  series: 

l

2 l n

x

Bn = l  f xsin  dx 

> 0

l

sin  dx 

> l

= 2 2  n

x

l klx   x

> 0

lllll 

0



2k 

  (lx   x2 ) l

n

  

2

 l

cos   (l  2x)  sin   2  cos 

> l

n

x  n

x 3

n

x

 n 

n

x

# MSAJCE  249 

  

3 3

 2

 l

 n   n  

 l

l

2k 

  2( 1) n 





 2 3

 [(1) n 1] 

2k   l

l   n 

n3

 3

> 2

= 4kl  n

# 11 



8kl 2

= n3

 3 , n  odd 

0, n  even 

Required  Solution: 

y(x,t)=   

> 
> n1,3,5
> 33

8kl 2

n

 sin  n

x cos  n

ct 

l l

 3

 8kl   1 sin  (2 n 1) 

x cos  (2 n 1) 

ct 2  

> n0

(2 n 1) 3 l l

2.A taut  string  of  length  2l is  fastened  at  both  ends  . The  midpoint  of  the  string  is  taken  to  a

height  b and  then  released  from  rest  in  that  position . Find  the  displacement  of  the  string  at 

any  time .

Solution : let  L=2 l

Equation  of  AC: 

0  x  L

2

LBy  two  point  formula:  at  (0,0)  and  ( ,b) 

2

x  y  y  2bx 

L / 2 b L

Equation  of  CB:  L <x<L 

2

# MSAJCE  250 LBy  two point  formula,  at  ( ,b)and  (L,0) 

2

y  2b(L  x)

L

y(x,0)=  



 L



,  x  L

2

2b(L  x) L

L 2

2bx  ,0   x  L

The  ODWE  ytt   c y2

> cc

Suitable  solution  y(x,t)=  (Acos  px  +Bsin  px)(Ccos  pct  +Dsin  pct) 

Boundary  and  initial  conditions  are  (i)  y(0,t)  = 0 (ii)  y( l,t) =  0

(iii)  y t (x,0)=0  (iv)  y(x,0)=f(x),  0<  x < l .

Using  Boundary  and  initial  conditions: 

i)  y(0,t)  = 0,  put  x=0 

A(Ccos  pct  +Dsin  pct)=0   A=0 

 Suitable  solution  y(x,t)=  Bsin  px  (Ccos  pct  +Dsin  pct) 

ii)  y( l,t)  = 0  , put  x= l

Bsin  pl (Ccos  pct  +Dsin  pct)=0   B  0 Bsin  pl =0 

pl  = n

 p=  n



l l l

l

 Suitable  solution  y(x,t)=  Bsin  n

x (Ccos  nct  +Dsin  n

ct  )

v)  y t (x,0)=0 

Bsin  n

x l

l n

c

(C( -sin  nct  ) +Dcos  nct  )

l l

# MSAJCE  251 Put  t=0   Bsin  n

x l

l n

c (Dcos0)=0  D=0 

 Suitable  solution  y(x,t)=  Bsin  nx Ccos  n

ct 

l l

> n
> 

General  solution:  y(x,t)=  B

> n1

vi)  y(x,0)=f(x),  0<  x < l .

sin  nx cos  n

ct 

l l

> 

#  n 

> n1

l

Here  t=0  B sin  nx = f(x)=  



 L



,  x  L

2

2b(L  x) L

L 2

2bx  ,0   x  L

Half  range  sine  series: 

Bn = l

2 l

l 0

n

x

#  f xsin  dx 











LL

dx   

L

sin  dx 

n

x L 2b(L  x) n

x

L

=  sin 

L L L

> 2

2 2 2bx 

0

=

sin cos 

> L

L



L L 

2 2b 



L 

> 2













  L  

  0



  (1) 









(x)  n

  

n

x  2

n



 L 

n

x 

L

L L 











 L







   

  L  L

> 2



  (1) 

 

 L 

 2 2b (L  x)

 n

 2 

sin  n

x 

L

n



 cos  n

x 

   

n  L 2

n

  L 2 n

 n

L2 L2

  cos     sin   cos     sin  

L2 2n

 2 n

 2 2n

 2 n

 2

4b 

# MSAJCE  252 



= 22  2 2 2

n 

sin 

L2

L n



4b 

= sin  n



2

8b

n2

 2

Required  Solution:Put  L=2 l 

> n1

n2

 2 2 L L

y(x,t)=   8b sin  n

 n

x n

ct 

sin  cos  

> n1

n2

 2 2 2l 2l

=  8b sin  n

 n

x n

ct 

sin  cos 

3.If  a string  of  length  'l ' is  initially  at  rest  in  its  equilibrium  position  and each  of  its  points  

> 0

l

 t 

 t 0

is  given  the  velocity   y   v Sin 3

 x , 0  x  l . Determine  the  displacement  y(x,  t). 

Solution  :

Let  l=20 

The  ODWE  ytt   c ycc 2

Suitable  solution  y(x,t)=  (Acos  px  +Bsin  px)(Ccos  pct  +Dsin  pct) 

Boundary  and  initial  conditions  are  (i)  y(0,t)  = 0 (ii)  y( l,t) =  0

x

l

> 3

(iii)  y (x,0)=0  (iv)  y t (x,0)=f(x)   v0 sin 

Using  Boundary  and initial  conditions: 

i)  y(0,t)  = 0,  put  x=0 

A(Ccos  pct  +Dsin  pct)=0   A=0 

 Suitable  solution  y(x,t)=  Bsin  px  (Ccos  pct +Dsin  pct) 

ii)  y( l,t)  = 0  , put  x= l

# MSAJCE  253 Bsin  pl (Ccos  pct  +Dsin  pct)=0   B  0 Bsin  pl =0 

l

pl  = n

 p=  n



 Suitable  solution  y(x,t)=  Bsin  n

x (Ccos  n

ct  +Dsin  n

ct  )

l l l

iii)  y (x,0)=0 

l

Bsin  n

x .C=0  C=0 

 Suitable  solution  y(x,t)=  Bsin  nx Dsin  n

ct 

l l

> n
> 

General  solution:  y(x,t)=  B

> n1

sin  nx sin  n

ct 

l l

iv)  y t (x,0)=f(x),  0<  x < l .

> t
> 
> n1

#  ny (x,t)=  B

> t
> 
> n1

#  ny (x,0)=  B

sin  nx n

c cos  n

ct 

l l l

sin  n

x n

c

l l l

x3

> 0

 v sin 





l

x 

l

v

l ll

x

c

4 

c 3

x

 B sin   B sin   ...   3sin   sin 

x 2

c 2

x 3

B sin  3

0

> 321
> 1

B = 0

> 3

B = - 4

> 0

v 2 4 5B  B  B  ...   0

B  l

> 1

l l l

c 3v 3

c

l 4 l

3v0

c 4

lv 

12 

c

> 0
> 3

B  

Required  Solution: 

> 1

y(x,t)=  B l l 3sin 

x sin 

ct   B

4

c

 3v0 sin 

x sin 

ct 

l l 12 

c

sin  3

x sin  3

ct 

l l

 lv 0 sin  3

x sin  3

ct 

l l

# MSAJCE  254 4.A  rod 30 cm  long has  its  ends  A and  B kept at  20 0C and  80 0C respectively  until  steady 

state  conditions  prevail  the  temperature  at each  end is  then  suddenly  reduced to  00 c

and  kept  so.  Find  the  resulting  temperature  function  u(x,t)  taking  x=0  at  A. 

Solution :

Let  l=  30  In steady  state  uxx   0







 l

In  initial  temperature  u(x)  = b  a  x + a

u(x,0)=  60 x  20 

l

After  change  ODHE:  ut 

##  uxx 2

Suitable  Solutions: 

u(x,t)=  (Acospx  + Bsin  px)  e  

> 2p2t

Boundary  and  Initial  Conditions: 

i)  u(0,t)=0  ii)  u( l, t)=0  iii)  u(x,0)=  60 x  20 

l

Using  Boundary  and initial  conditions: 

i)  u(0,t)=0 

Here  x=0   u(0,t)=  Ae   

> 2p2t

A=0 

Suitable  solution:  u(x,t)=  Bsin  px  e  

> 2p2t

ii)  u( l, t)=0 

# MSAJCE  255 Here  x= l  B sin  ple    

> 2p2t

 0

Sinp l==0  pl=nπ  p=  n



l 

> l2

Suitable  solution:  u(x,t)=  Bsin  n

x e

l   

> 
> 2n2
> 2t2

General  Solution:  u(x,t)= 

> 

#  n

> n1

B sin  l

n

x l 2

e   

> 
> 2n2
> 2t2

iii)  u(x,0)=f(x)=  60 x  20 

l

n

x

lnB sin 

> 
> n1
> 0

e = 60 x  20 

l

By  Half  range  sine  series, 

l

2 l n

x

Bn = l  f xsin  dx 

> 0

dx 

l

2 l n

x

> 0

 20)sin  (60 x

l l

l

l

 cos  n

x 

ll 















 0

   

 l

  2 ( 60 x  20)  l   (60 ) l 

 n

 2 

 sin  n

x 

 n

 

 l 

   



 

2 2 

 n  

l

 60   n

  l

 n

   ( l )sin 

l

n

  l (80) cos 

l

 2 l

l n

 80( 1) n  20  40  14( 1) n n



# MSAJCE  256 Required  Solution: 

: u(x,t)= 

> 

(1  4( 

> n1

40 



> n

1)  ) sin  l

n

x l 2

e   

> 
> 2n2
> 2t2
> n1

=

 30 

> 900
> 

40  (1  4( 1) n ) sin  n

x e  

> 
> 2n2
> 2t2

5.  An  infinitely  long  rectangular  plate  with  insulated  surface  10  cm  wide.  The  two  long 

edges  and  one  short  edge  are  kept  at  00 temperature,  while  the  other  short  edge  x=0  is  kept 

at  temperature  given  by  u=20y,  0  y  5,  u=20(10 -y),5 y  10.  Find  the  steady  state 

temperature  in  the  plate. 

Solution  : Steady  state  two  dimensional  heat  equation: 

uxx   uyy   0

Infinite  plate  extended  in  x-direction  : Let  l=10 

I Boundary  Conditions 

i)  u(x,0)  = 0 ii)  u(x, l) = 0



iii)  u(∞,y)  = 0 iv)  u(0,y)  = f(y)=  





l

2

20( l  y),   y  l

2

20  y,0   y  l

II  Suitable  Solution: 

u(x,y)=  Ae  px   Be  px  (Ccospy  + Dsinpy) 

Using  boundary  conditions: 

i)  u(x,0)  = Ae  px   Be  px  C  0

C=0 

Suitable  Solution: 

# MSAJCE  257 u(x,y)=  Ae  px   Be  px  Dsinpy 

ii)  u(x, l) = 0

Dsinp l=0  Sinp l==0  pl=nπ  p=  n



l

Suitable  Solution: 

 

 l 

> n
> x

 n 

> x

n

y

l

u(x,y)=   Ae   Be  l  D sin 

iii)  u(∞,y)  = 0

B e =0  B=0   

> n
> x
> l

n

y

l

General  Solution:  u(x,y)=  Bne sin 

> n1



(iv)  u(0,y)  = f(y)=  





l

2

20( l  y),   y  l

2

20 y,0   y  l

> 
> n1

#  n l



B sin  nx = f(x)=  





l

2

20( l  y),   y  l

2

20 y,0   y  l

Half  range  sine  series: 

Bn = l

2 l

l 0

n

x

#  f xsin  dx 











l 

> l

n

xn

x

l dx   (l  x)sin  dx 

=  x sin 

l l

> 2

 l

40  2

0

# MSAJCE  258 cos 

> l

l

l 

40  





l 





 sin  





  l  

  0



  (1) 



l 









= (x)

 n

 2 

n

x  2

n



n

x 

l

ll

l

















 l

> 2



   

  l



  (1) 





 40  (l  x)  n

 2 

sin  n

x 

n

 

l 

 cos  n

x 

   

40   2

2

n n

  ll 2

n

  l n

l 2

  cos     sin   cos     sin  

l 2n

 2 n

 2 2n

 2 n

 2









= 2

40  

2

n 

sin 2 2

l 2

l n



2n2

 2

= 80 l sin  n



Required  Solution:Put l=10 

u(x,y)=  

> 

2

> n
> x

e 10 

sin 

800  n

 

> n1

n2

 2

n

y

10 

sin 

# MSAJCE  259 UNIT  IV 

FOURIER  TRANSFORMS 

PART  – A

1.  State  Fourier  integral  theorem. 

If  f(x)  is  piece -wise  continuously  differentiable  and  absolutely  integrable  in  (-  ,  )

then 

1  

2

    

f x    f teis xtdtds  (or)  equivalently 

1   

> 0

f x 

   f tcos 

 t  x dt  d

 .

This  is  known  as Fourier  integral  theorem  or  Fourier  integral  formula. 

2.  Define  Fourier  transform  pair  (or)  Define  Fourier  transform  and  its  inverse  transform. 

The  complex  (or  infinite)  Fourier  transform  of  f(x)  is  given  by 

F f x  F s  1 

2  

#  f xeisx  dx 

Then  the  function  f(x)  is  the  inverse  Fourier  Transform  of  F(s)  and is  given  by 

# MSAJCE  260 f x   

1 

2

  

#  isx 

F s e dx  .

F f x and  F 1 Fs its  also called  Fourier  Transform  Pairs. 

3.  Show  that f(x) =  1,  0 < x <  cannot  be  represented  by  a Fourier  integral. 

##    0

> 

#  

> 00

f x 

> 

# dx   1dx   x   and  this  value tends  to   as  x   .

> 

i.e.,  1 f xdx  is  not  convergent.  Hence  f x  1 cannot  be represented  by  a Fourier 

> 0

integral. 

4.  State  and  prove  the  linear  property  of  FT. 

Stt: 

F a f x b g x  a F s  bG s

Proof: 

1 

2  

F f x  F s   f xeisx  dx 

1 

2  

F a f x  b g x   a f x b g x eisx  dx 

1 1

2

 2

 

> 
> 

#  a f x eisx  dx 

> 

#  b g x eisx  dx  

2

 2

  

> 
>  

 

a  f x eisx  dx  b  g x eisx  dx 

 a F s  bG s.

# MSAJCE  261 5.  State  and  prove  the  Shifting  property  of  FT. 

Stt: 

F f x  a   eias  F s.

Proof: 

1 

2  

F f x  F s   f xeisx  dx 

F f x  a  1 

2  

#  f x  aeisx  dx 

Put  x  a  y  x  y  a when  x   , y   

dx   dy  when  x  , y  

1 

2  

#  f yeis  ya dy  1 

2  

#  f yeisy eisa  dy 

> 

 eisa 

#  f yeisy  dy 

> 

2   2  

 eisa 

#  f xeisx  dx   eisa  F s.

6.  State  and  prove  the  Change  of  scale  property of  FT. 

Stt: 

a a 

F f ax    1 F  s  , a  0 .

Proof: 

F f x  F s  1 

2

  

#  f xeisx  dx 

# MSAJCE  262 F f ax   1 

2  

#  f ax eisx  dx 

Put  ax   y  x  y

a when  x   , y   

a dx   dy  i.e.,  dx   dy 

a when  x  , y  

##  

1 

2

      

> 
> 
> is y

  a

f y e dy 

a  

1   i s  y  

> a

 a 2  

f y e dy 

##  

1 1   

2  

 

   i s  y  

> a

f y e dy 

a 

a a 

 1 F  s  .

7.  If  F f x  F s, prove  that  F f x eiax   F s  a.

Proof: 

F f x  F s  1 

2  

#  f xeisx  dx 

1 

2

  

F eiax  f x   eiax  f xeisx  dx 

1 

2  

  f xeisax dx   F s  a.

8.  State  and  prove  the  Modulation  property  of  FT.  (OR)  If  Fourier  transform  of  f(x)  is 

F(s). 

# MSAJCE  263 Prove  that  the  Fourier  transform  of  2

f xcos  ax  is  1 F(s  a)  F(s  a).

Stt: 

2

F f xcos  ax    1 f s  a  f s  a where  f s  F f x .

Proof: 

1 

2  

F f xcos ax    f x cos axe isx  dx 

1

2

> 

2    

 eiax   eiax  

  f xeisx 

  dx 

##    

1 

2  

1  



  

> isx iax iax

 f x e e  e dx 

2  

1 1 1 1

2 2

 2 2

  

> 
>  

#  f xeisax dx    f xeisax dx 

 1 f s  a 1 f s  a  1 f s  a f s  a .

2 2 2

9. What is  meant  by  self -reciprocal  with  respect  to  FT? 

If  the  Fourier transform  of  f x is  obtained  just  by  replacing  x by  s,  then  f x is  called 

self -reciprocal  with  respect  to  FT. 

Example:   x2

f x  e 2

# MSAJCE  264  s2

F f x F s  e 2 .

10.  Prove  that  2 

> c

  c cF  f xcos  ax   1 F (s  a)  F (s  a) where  cF denotes  the  Fourier 

cosine 

transform  f x.

> 0

2 

The  F.C.T  is,  Fc f x 

  f (x) cos  sxdx 

> 0

2 

Fc f xcos  ax  

  f (x) cos  ax  cos  sxdx 

2 



  f (x) cos  sx cos  axdx 

> 0

12 



  f (x) 2 cos( s  a)x  cos( s  a)xdx 

> 0





 0  0

2 

2 

1   f (x) cos( s  a)xdx 



   f (x) cos( s  a)xdx   

2



2 c 1 [F (s  a)  Fc (s  a)]. 

##     

c 11.  Prove  that  F x f x   sd F  f x 

ds  .

> 0

2 

W.k.t  Fs f x 

  f (x) sin  sxdx 

# MSAJCE  265 2 

 

 0 

d Fs f x d

ds     f (x) sin  sxdx 

ds 



##  



2   





 

 0

#  d

f (x) sin  sx  dx 

ds 

2   

 0 



   f (x) cos  sx . x dx 

> 0

 

2 

##  x f (x) cos  sxdx  c  F x f x .

12.  Define  Fourier  cosine  transform  (FCT)  pair. 

The  infinite  Fourier  cosine  transform  of  f(x)  is  defined  by 

> 0

2 

Fc f x 

  f xcos  sxdx 

The  inverse  Fourier  cosine  transform  Fc f x is  defined  by 

f x 

> 0

2 

  Fc f xcos  sxdx  .

##  F  f x c     c cand  F F f x1    are  called  Fourier  Cosine  Transform  Pairs. 

13.  Find  the  Fourier  Cosine  transform  of  f(x)  = cos  x

0 if  x  a

if  0  x  a .



We  know  that 

> 0

2 

Fc f x 

  f xcos  sxdx 

> 0

2 a



 cos  x cos  sxdx 

# MSAJCE  266 0

2 1 a

 2  cos 1 s x  cos 1 s xdx 

> 0

1

 

2

  

sin(1  s)x sin(1  s)x a

1 s 1 s

  

  

1  sin(1  s)a  sin(1  s)a  0  0

2  1 s 1 s

 



1  sin(1  s)a  sin(1  s)a 

2  1 s 1 s

 provided  s  1 ; s  1. 

14.  Find  the  Fourier  Cosine  transform  of  eax  , a > 0. 

Given  f x  eax 

> 0

2 

We  know  that  F.C.T  is,  Fc f x 

  f xcos  sxdx 



2 

 eax  cos  sxdx  

> 0
> 22
> 

a  b ax 

But  e cos  bxdx  

> 0

a

Here  a  a, b  s 

> 22

    

> c

 2  a

F eax   

 a  s

 , a  0 .

15.  Find the  Fourier  Cosine  transform  of  e x .

We  know  that 

# MSAJCE  267 0

2 

Fc f x 

  f xcos  axdx 

> 0
> c

2    

> xx



F e  

 e cos  axdx  = 2  1 

 1 a2 .

16.  Define  Fourier  sine  transform  (FST)  pair. 

The infinite  Fourier  sine  transform  of  f(x)  is  defined  by 

> 0

2 

Fs f x 

  f xsin  sxdx  .

The  inverse  Fourier  sine  transform  of  Fs f x is  defined  by 

> 0

2 

f x 

  Fs f xsin  sxdx  .

##  s    s s 

> 1

   F  f x  and  F F f x are  called  Fourier  Sine  Transform  Pairs. 

> 0

17.  Find the  Fourier  Sine  transform of  e3x .

2  

> s

 

 The  FST  is,  F  f x  f xsin  sxdx  .   3x

Here  f x  e .

> 0
> s

2  

> 3x3x



F e  

 e sin  sxdx 

##  32 

## 2  s

#  s 2

> 0
> s

2 

> ax

 ax  

Formula  F e  

 e sin  sxdx  .

# MSAJCE  268 18.  Find  the  Fourier  Sine  transform  of  f(x)=  e x .

2 

We  know that  Fs[ f (x)]  

  f (x) sin  sxdx 

> 0
> 0

2 

> 

 sF [e x ] e x sin  sxdx 

 2  2

2  s 

 1 s 

> 

 

 0





#  ax 

a  b

  e sin  bxdx   2 ]  .

b

19.  Find  the  Fourier  Sine transform  of  3e2 x .

Let  f x  3e2x

W.k.t 

> 0

2 

F  f x s  

  f xsin  sxdx  

> 0

3e 2 x sin  sx  dx 

2 

> 

 

#  e 2 x sin  sx  dx 

2 

 3 

##  0

> 





 0

> 2

 3 2  e2 x

 4  s 



 

  s 2

4  s

 1  

0

2 

##  2sin  sx   s cos  sx   3 



 3 2  s 

 s 2  4

2  3s  .

 s2  4



20. Find  the  Fourier  Sine  transform  of  1 .

x

We  know  that 

# MSAJCE  269 0

2 

Fs f x 

  f xsin  sxdx 

1  2  1

  x sin  sxdx Fs  x  =

Let  sx  =



> 0

x 0 

  0

sdx  = d

 x 0 

  0

=

 

 sin 

 ds 0  

2   s  d

 =

 d



 0

2  sin 

 = 2 

 

 2  =

 .

2

21. State  the  Convolution  theorem  on  Fourier  transform. 

If  F s and  Gs are  the  Fourier  transform  of  f x and  g x respectively.  Then  the 

Fourier  transforms  of  the  convolution  of  f x g xand  is  the  product  of  their  Fourier 

transforms. 

F f x* g x  F s G s

 F f x F gx.

22.State  the  Parseval’s  formula or  identity on  Fourier  Transform. 

> 

f (x) 2dx    F (s) 2ds  .

> 
> 
> 

If  F s is  the  Fourier  transform  of  f x, then  

PART  B

1.  State  and  prove  the  convolution  theorem  for  Fourier  Transforms .

# MSAJCE  270 Statement: 

If  F s and  Gs are  the  Fourier  transform  of  f x and  g x respectively.  Then  the 

Fourier  transforms  of  the  convolution  of  f x and  g x is  the  product  of  their  Fourier 

transforms. 

F f x* g x  F s G s

 F f x F gx.

Where  f  g x 

> 

# 

> 

f (t)g(x  t)dt 

1

2



PROOF : By  convolution  of  two  functions: 

# 

> 

## f  g x  f (t)g(x  t)dt 

1 

2



The  Fourier  transform  of  f  g is 

> 

F[  f  g ]  ( f  g)eisx dx 

> 

1

2



> 

 

> 



  

> 
> 





# { f (t)g(x  t)dt eisx dx 

11

2

 2

 

> 

  f (t)dt   g(x  t)eisx dx 

> 

1

2  

Put  u=x -t du=dx  x=    u=   and  x= -  u= -  

> 

F[  f  g ]   f (t)dt   g(u)eis (ut ) du 

> 

1

2  

> 
> 
> 

#  g(u)eisu  du 

> 

1

  f (t)eist  dt 

1

2

2



# MSAJCE  271 F[(  f  g )(x)]=F(s)G(s) 

0,  in  x  a

a2  x2 ,in  x  a

2.Find  the  Fourier  transform  of  f (x)  

Hence  evaluate  0 

#  dt   4t3 

> 

 sin  t  t cos t 



Solution:  0,  in  x  a

a2  x2 ,in  x  a

Given:  f (x)  

> 

F(s)    f (x)eisx  dx 

> 

1

2



> a
> a

1

 (a2  x2 )eisx  dx 

2



> a

 (a2  x2 ) cos  sxdx 

1

2 0

 

 

s3  s2

2  2a cos  as   2sin  as    0

2

  







 s3

4  sin  as   as  cos as  

2 





 2 s3

2  sin  as   as  cos  as  

 

> 2

3.  Show  that  e is  reciprocal  with  respect  to  Fourier  transforms  

> x2

Solution :

Fourier  transform: 

# MSAJCE  272 

F[f(x)]    f (x)eisx dx 

> 

1

2



> 

 e  

> x2
> 2

eisx dx 

> 

1

2



dx 

> 

 e 

> 
> 2
> x2
> isx

1

2



> s2

1      

> (xis )2
> 
> 2

 e   e 2 dx 

2

  

2

y  x  is  dy   1 dx  x    y   and  x    y   

2

e e 2dy F (s)   s2

1

2

 2 

> 2
> 
> 
> y

# 

 e s2

#   

> 
> y22

2 e dy 

> 0

1



 2

2

2 

> s2

 e 2

> 2



# 

> 

where  e dy   

> 0
> y

F (s)  e 2 

> s2
> 2

f(x)=  e is  self  reciprocal  with  respect  to  Fourier  transform.  

> x2



1 x if  x  1

4.  Find  the Fourier  transform  of  f (x)   0 if  x  1 . Hence  deduce  that  

> 0

 

#   dt   3t 

> 

 sin  t 4



Solution :

Fourier  transform: 

# MSAJCE  273 

F[f(x)]    f (x)eisx dx 

> 

1

2



> 1
> 1

1

 (1  x )eisx dx 

2



> 1

# 

> 0

(1  x ) cos  sxdx  2

2





0

2 



 (1)  s2

  cos  sx  1

s

sin  sx 



 (1  x)





 2

ss2

2   cos  sx   1 

 



 

F (s)  s2

2 1 cos  sx  

  

> 

By  parseval’s  identity,   F (s) 2 ds    f (x) 2 dx    

>  
>  1
> 2
> 1

# 2

#  f (x) dx  = 1 x

> 1

## 2

dx  21 x

> 0
> 1
> 0
> 3

2   dx    1 x

3

> 1
> 0
> 3

3

2

3

2

  1x = .

s2  

> 2

2 1 cos  s 2

F (s) 

   s4 

8 sin 4 (s / 2)  



 

> 
> 

 s4

> 
> 2

#  F (s) ds  

   ds 

0  s4

8  sin 4 (s / 2)   16   sin  4 (s / 2)  

ds  

 

Put  t=s/2  2t=s  2dt=ds 

s  0  t  0 and s    t  

## 2t4 

0 



  dt 

## t 



2dt   

> 0



#  4

16   sin  4 (s / 2)   2  sin  4 t 



# MSAJCE  274 



 

> 0



#  4 dt  

## t

2  sin 4 t  2

3



> 4



  

> 0



#  dt  

## t 

> 

sin 4 t 



3



0

2  x for 1  x  2

for  x  2

x for  0  x  1

5.  Find  the  Fourier  cosine  transform  of  f (x)  

2 

Solution : Fc[ f (x)]  

  f (x) cos  sxdx 

> 0



2

0

2 1

Fc[ f (x)]  

  x cos  sxdx   (2   x) cos  sxdx 

> 1

 

1 

2    (1)  0  s2

cos  sx 2 

s

sin  sx 

 (2   x)

s2 

cos  sx 1 

s

sin  sx 



 x

  s2 s2 s2 s2

s s

2 sin  s  cos  s  1  cos  2s  sin  s  cos  s 

 





 

 2

ss2 s2

2 2 cos  s  cos  2s  1 

  

> 22

6.  Find the Fourier  cosine  transform  of  ea x

Solution :

2 

Fc[ f (x)]  

  f (x) cos  sxdx 

> 0
> 

F [ f (x)]  

> 0

2 2 2

ea x cos  sxdx 

 c

# MSAJCE  275 

2 1 ea2 x2

eisx dx 

 2  



> 

2 1 R.P ea2 x2 isx dx 

> 



 2 

> 
> 
> 
> 

dx        

>  ax 2
> s2is 2
> 4a2a

 R.P e 1

2

 

> 
> 
> 
> 

dx            

>  ax 2
> s2is 2
> 2
> s2
> 2a4a

 e 4a R.P e 1

2



Put  t  ax   is  dt=adx 

2a

x     t    and x    t    

> 
> 
> s2

 e  R.P et1  

> 4a2

2

 R.P



1

a2

 

> 2

dt  1 2    

> 4a
> s2



a e 

> c

F [ f (x)]    2  

> 4a
> s2

e  

a 2

1

> ax

7. Find  Fourier  sine  transform  of  e , a  0 and deduce  that   

> 
> 2

eax  

> 2

sin  sxdx   

> 0

s  a



2

s

Solution :

2 

Fs [ f (x)]  

  f (x)sin  sxdx 

> 0

2  s 

 s2  a2 



By  inversion  formula, 

2 

  Fs [ f (x)]sin  sxds f (x) 

> 0

# MSAJCE  276 0

2  2  s 

 s2  a2 sin  sxds   f (x)

 

s  

> 



#  220  s  a 

> 2



 ax  

> 2

sin  sxds   f (x)  e ,a>0 

8.  Evaluate   

> 
> 0
> 222

#  2 x  b x  a  

dx  using  Fourier  Cosine  Transform. 

Solution : F [eax  ] c

2  a 

 s2  a2 

By  Parseval’s  identity  

> 

#  Fc (s)Gc (s)ds   f (x)g(x)dx  

> 00
> 

# 

> 

# 

> 0
> 2

 2 2   2  e dx ds   e

> 0

2  a  2  b  ax  bx 

 s  a 

  s  b 

> 0

2ab   ds  1

  (s2  a2 )( s2  b2 )    (a  b) put  s=x 

> 
> 0

#  (x2  a2 )( x2  b2 )  2ab  (a  b)

dx 

 1

> 

9.  Evaluate   (x2 1)( x2  4) 0

dx 

Solution :

> 
> 0

Proving   (x2 1)( x2  4)   2ab  (a  b)

dx 

 1

Put  a=1  and  b=2 

> 0

 (x2 1)( x2  4)   (2)(1)(2)(3)  12 

dx 





# MSAJCE  277 10.  Using  Parseval’s  identity  evaluate: 

> 

#  

> 0
> 222

# x  a 

x2dx 

Solution ;

Consider  the  function  f (x)  eax 

F [eax  ] s

2  s 

 s2  a2 

#  

> 00

By  parseval’s  identity,  [F (s)] 2 ds   [ f (x)] 2 dx c

> 

#   

> 

 

> 0



> 2



 2

2  s 2  ds  [e ] dx ax  2

  s  a  0

 



   00  22 2

2  

 2a

ds  

# s  a 

e2ax  

s2 put  s=x 

#  2a 2 4a

1

   

> 222

dx   



 

> 0

 x  a  

#  

> 

 x2

UNIT  V

Z -TRANSFORMS  AND  DIFFERENCE  EQUATIONS 

PART  – A

1.  Prove  that  Zan  Z  a

z is  z  a .

We  know  that 



## Z xn  x n zn

n0

# MSAJCE  278 an zn

# Zan 

> 
> n0
> 

#    n

#   

> n0

#  z 

# a

 

 1     .... 

z z

a  a 2







 1 a  1

z 

> 2

##  1 x  x  ... 1

# 1 x



  z

 z  a 1 z , z  a .

z  a

> 2

z 1

z

2.  Prove  that  Z n  .

> 

We  know that  Zxn  xnzn

> n0
> 

## Zn nz  n

> n0
> 

# 

> n0

##  n

## z

## n  0  1  2  3  ... 

## z z 2 z 2

## 

##   .... 

## 

##  1 2   3

## 1   1   1 2

##  z   z z 

##  

## 

## 1 2 

##  1

## 1 

## z  z  1x2 1 2x  3x2 .... 

# MSAJCE  279  

## 1  z 12 

##    

## z z 

## 2

##  

## 1  z  

## z z 1  z 1

## z 2 .

3.  Find  zan .

> 

We  know  that  Zxn  xnzn

> n

# a n zn

> n

# Zan  

> 

1 

#  an zn  an zn

n  n0

##  .......  a3 z3  a2 z2  az  zan 

## 

## 

## 

##   z  a 

## zn za

 az   z

1 az  z  a

## 

## 

##  a

## G.P.  1 r 

z  a 2 z

# 1 az  z  a .

4.  Find  Zean  .

# MSAJCE  280 We  know  that  Zan  z  a

## z

## z  e a

## Zean   Z ea n  z Here  a  e a .

5.  Find  Zan1 .

We  know  that  Zan  z  a

## z

## Zan1  Zan a 1 

##  a1Zan 

## z  a 

##  a1  z  1 

##  z 

## 

## a  z  a  .

 

 nn 16. Find  Z  1  .

1  

A B

nn 1 n n 1

1  An 1 Bn

Put  n  0 we  get,  1  A

Put  n  1 we  get,  1  B (i.e)  B  1

## 1 1 1

##  

#   n n 1n n 1

# MSAJCE  281 We  know  that  z 1n

## Z 1   log  z

## z 1

##   z log n 1

## 1

## Z  z

> 

## 

##  

## 1

## n

##   z1   Z 

## nn 1

## Z  1

## n 1 by  linearity 

z 1

 z log 

z 1

 log  zz

 1 zlog  z 1

z .  

> 7. Find

## Zan cos  n

#  .    

> a
> We know that Z

# an f n F  z   

> zz/a

## Zan cos n

# Zcos n

#    

> zz/a

## z 2  2z cos 

#  1

##   zz  cos 

#   



 2 cos 

##  1



a

zz 2

a 2

a a

z  z  cos 

##  

## z 2  2az  cos 

#   a 2

##  zz  a cos 

#  

# MSAJCE  282 8.  Find 

 

 a n 

Z  n!  .

Sol: 

We  know  that  a 

## Zan f n F  z 

##  zz / a

> n

## Z a  1 1  

## n!  Z n!

## 

zz / a e1/ z  

  1   e1 / z

Z n!

> 1

##  e z / a

a

#  e z

9.  Prove  that  Znf  n z d FZ.

> 

dz 

Give.,  FZ  Zf n

## FZ  f nzn

> n0
> n0

## dz 

> 

## d FZ  nf nzn1

> n

z

z

> 

 nf  n

> n0

# MSAJCE  283 n0dz 

> 

z d FZ nf  nzn

dz 

 Znf  n

Znf  x z d FZ

10.  Find  Zn2 .

We  know  that  dz 

Znf  n Z d FZ

dz 

Zn2  Znn  z d Zn

# 

# 

# 

# 

#  2

# z  1

# z

# dz 

#   z d 



z 12

z 12 1 z2z 1

 z



 

 

> 2

# z 1

 z z 1  2z 

 

 

> 2

# z 1

 z 1  z 

# z 1 z 2  z

z z 13  z 13



# MSAJCE  284 11.  Find  the  Z-transform  of  nC k .

##  1 nC  z 1  nC  z 2  ..............  nC  z n  

> 12n

This  is  the  expansion  of  binominal  theorem. 

##  1 z 1 n

12.  Find  Zet t 2 .

We  know  that  Zeat  f t Zf t aT 

zze 

zze Ze t  Zt  T

t 2 2

##  T ze  ze  12 T T

# ze T 13

13.  Define  Unit  Sample  sequence. 

## 

The  unit  sample  sequence 

#  n is  defined  the  sequence  with  values 

## n  0for 

## 0 for  n  0

##  n 1

14.  Define  Unit  step  sequence. 

The  unit  step  sequence  un has  values. 

##  for  n  0

## 0 for  n  0

## un 1

# MSAJCE  285 15.  Find  Z2n

#  n 2.

## Z2n

# n 2 Z

# n 2z  z / 2

zz

1  4

> 2

 

 2 

z 2 

  1     

> zz/2

 

16.  If  Zf n Fz,, then  z 

## f 0 lim  Fz.

> 

Zf n  f nz n

> n0

z 2

z

 f 0 f 1 f 2 ....... 

## 

##  ..... z 2

#   f 1 f 2lim  Zf n lim f 0  

> x z

## z

> x

## lim  Fz f 0.

17.  Find  the  Z-transform  of  na nun.

dz  1 z  a 

Zna nun z 1  by  def  . of  u (n) 

d z

# 1 az  1 1d

## dz  1

##  z 1

##  z1 11az 1 2a

# MSAJCE  286  az  1 1az  1 2

az  1

# 1az  1 2 .

18.  Define  convolution  of  sequences. 

i)  The  convolution  of  two  sequences  xn  and  yn  is  defined  as 

> 

a.  xn* yn   f Kgn K  if  the  sequences  are  non  – causal  and  

> K
> n

b.  xn* yn   f Kgn  K  if the  sequences are  causal.  

> K0

ii)  The  convolution  of  two  functions  f(t)  and  g (t) is  defined  as 

> n

# f t* gt   f KT gn  K T, where  is T  is the  sampling  period.  

> K0

# MSAJCE  287 PART  B

1.  Using  the Z  transforms,  Solve 

Solution: 

Given 

[

( ) U (z) - -2z -3z  = 0 [ ]

U (z)  =

U (z)  =

= = + ……………  (1) 

Then 

Put  z = -1,  we  get  Put  z =  -2,  we  get 

4 =A  3 = -B

A = 4 B =  -3

(1)  -[=

 U (z)  = -3[ 

# MSAJCE  288 Z [u(n)]  = -3[ 

u(n)  = -3 [

= 4(  - 3( 

= [4 -3(  )]  (

2.  Solve  the  difference  equation 

Solution :

Given 

[

[ [ ]

[

[

[

Y (z)  =

=

=

=

= ……….(1) 

# MSAJCE  289 Put  z=1  , we  get  Put  z =-2 , we  get 

8 = 3A  -4 =  -3B 

A=8/3 

(1) 

B =  4/3 

Z[y(n)]  =

y(n)  =

=

3.  Using  Z transforms,  Solve  ,

Solution :

Given 

]

[

( ) U (z) -z = , ]

( ) U  (z)  = z+ 

=

=

=

# MSAJCE  290 =

=

= = + ……………  (1) 

Put  z = 2,  we  get  Put z  = 4,  we  get 

1 =-2A 

A = -

1=  2B 

B =

(2)  = +[ 

 U (z)  = - +[ 

Z [u(n)]  = - + [

u(n)  = - [

= -

4.Using Z  transforms,  Solve  ,

Solution :

Given 

[

( ) Y (z)  = ,

( ) Y (z)  =

Y (z)  =

# MSAJCE  291 =

= = + + ……………  (1) 

Put  z = 2,  we  get  Put  z =  -3,  we  get  Equating  co -eff. 

on  both  sides,  we  get 1 =25A  1=  - 5C 

A = C = 0=A+B 

B = -A,  B = -

(1)  =

=

ie, 



 

5.  Find  Z 1 

z  a z  b .

z 2

Solution: 

 

 z z z 2

Z z  a z  b  Z z  a . z  b  

> 1

1 

z  a  . z  b 



z  * Z 1  z  Z 1 

# MSAJCE  292  an *bn

> n0

  

> nn

 a  m

  am bn  m  bn  

> m0

 b 

1 

 a n1

 bn  b  being  a G.P

a 1

b 

> n1n1

##  a  b

## a  b

Note:  

## 1 

## a 1

##  2

## 1 a  a  ...   an1 an



  

> 1



6.  Find  Z z 1 z  3 .

z2

Solution: 

  

> 1

1   z z 

z 1 z  3  Z z 1. z  3

z2

Z

 z  3

z  * Z 1 .z 1

 Z 1  z

##  1n *3 n

> n0

 

> n
> m0

 3  

> n

 1 m

 1m3nm  3n 

# MSAJCE  293 3

1 1

1 

 3n  3  being  a G.P

 1 n1

> n1

##  3 1

## 2

Note:  

## 1

##  ...   a  a 1 

## 

##  2

## 1 a  a an

> n1

# MSAJCE  294

