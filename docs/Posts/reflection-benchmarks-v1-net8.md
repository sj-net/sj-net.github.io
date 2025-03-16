```
BenchmarkDotNet v0.13.12, Windows 11 (10.0.22631.3235/23H2/2023Update/SunValley3)
13th Gen Intel Core i7-13620H, 1 CPU, 16 logical and 10 physical cores
.NET SDK 8.0.200
  [Host]   : .NET 8.0.2 (8.0.224.6711), X64 RyuJIT AVX2
  .NET 8.0 : .NET 8.0.2 (8.0.224.6711), X64 RyuJIT AVX2

Job=.NET 8.0  Runtime=.NET 8.0
```


| Method                  | Categories   | Mean      | Error     | StdDev    | Ratio | MannWhitney(10%) | Baseline |
|------------------------ |------------- |----------:|----------:|----------:|------:|----------------- |--------- |
| Refection_Get_DateTime  | get_DateTime | 20.275 ns | 0.4264 ns | 0.8515 ns |  1.00 | Base             | Yes      |
| IObject_Get_DateTime    | get_DateTime |  2.658 ns | 0.0768 ns | 0.1552 ns |  0.13 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Refection_Get_Decimal   | get_Decimal  | 23.176 ns | 0.4848 ns | 1.0436 ns |  1.00 | Base             | Yes      |
| IObject_Get_Decimal     | get_Decimal  |  6.032 ns | 0.1456 ns | 0.1619 ns |  0.26 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Refection_Get_Double    | get_Double   | 37.352 ns | 0.7621 ns | 1.2306 ns |  1.00 | Base             | Yes      |
| IObject_Get_Double      | get_Double   |  5.237 ns | 0.1304 ns | 0.3411 ns |  0.14 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Refection_Get_Integer   | get_Integer  | 30.268 ns | 2.2917 ns | 6.7210 ns |  1.00 | Base             | Yes      |
| IObject_Get_Integer     | get_Integer  |  3.261 ns | 0.0799 ns | 0.0748 ns |  0.09 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Refection_Get_String    | get_String   | 20.528 ns | 0.4176 ns | 0.9167 ns |  1.00 | Base             | Yes      |
| IObject_Get_String      | get_String   |  1.586 ns | 0.0571 ns | 0.1545 ns |  0.08 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Reflection_Set_DateTime | set_DateTime | 26.935 ns | 0.5522 ns | 0.9072 ns |  1.00 | Base             | Yes      |
| IObject_Set_DateTime    | set_DateTime |  5.310 ns | 0.1286 ns | 0.1263 ns |  0.20 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Reflection_Set_Decimal  | set_Decimal  | 28.959 ns | 0.6092 ns | 1.5170 ns |  1.00 | Base             | Yes      |
| IObject_Set_Decimal     | set_Decimal  |  5.510 ns | 0.1277 ns | 0.1312 ns |  0.19 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Reflection_Set_Double   | set_Double   | 26.702 ns | 0.5449 ns | 0.7815 ns |  1.00 | Base             | Yes      |
| IObject_Set_Double      | set_Double   |  3.587 ns | 0.0956 ns | 0.1371 ns |  0.13 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Reflection_Set_Integer  | set_Integer  | 26.763 ns | 0.5573 ns | 0.6195 ns |  1.00 | Base             | Yes      |
| IObject_Set_Integer     | set_Integer  |  3.845 ns | 0.1034 ns | 0.1942 ns |  0.14 | Faster           | No       |
|                         |              |           |           |           |       |                  |          |
| Reflection_Set_String   | set_String   | 28.180 ns | 0.5893 ns | 0.6051 ns |  1.00 | Base             | Yes      |
| IObject_Set_String      | set_String   |  2.699 ns | 0.0754 ns | 0.1238 ns |  0.10 | Faster           | No       |
