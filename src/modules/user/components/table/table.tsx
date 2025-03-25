'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SkeletonTableGlobal } from '@/components/ui/skeleton.table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoreVertical, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { useGetAllUsers, useGetProfile } from '../../services/queries.service'
import { User } from '../../types/user-type'
import { getRoleBadgeVariant, getRoleName } from '../common/badge.roles'
import { UserForm } from '../form/form'
import { useDeleteUser } from '../../services/mutation.service'
import { useUserStoreUpdate } from '../../store/useStoreUpdateUser'

export default function TableUser() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { data: profile } = useGetProfile()
  const { mutate: deleteUser, isPending: isLoadingDeleteUser } = useDeleteUser()
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers(
    currentPage,
    pageSize
  )
  const userStoreUpdate = useUserStoreUpdate()
  const totalUsers = users?.count || 0
  const totalPages = Math.ceil(totalUsers / pageSize)
  const disabledBtn = isLoadingDeleteUser
  const handleEditUser = (user: User) => {
    const { id, lastname, name, role, username } = user
    userStoreUpdate.updateUser({
      id,
      username,
      name,
      lastname,
      id_role: role.id,
    })
  }

  const handleDeleteUser = (id: string) => deleteUser(id)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-2 grid-rows-1 gap-4 max-xl:grid-cols-1">
        <UserForm />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingUsers ? (
              <SkeletonTableGlobal
                columns={['Usuario', 'Nombre', 'Apellido', 'Rol', 'Acciones']}
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table className="w-full border-collapse">
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="text-center px-4 py-2">
                          Usuario
                        </TableHead>
                        <TableHead className="text-center px-4 py-2">
                          Nombre
                        </TableHead>
                        <TableHead className="text-center px-4 py-2">
                          Apellido
                        </TableHead>
                        <TableHead className="text-center px-4 py-2">
                          Rol
                        </TableHead>
                        <TableHead className="text-center px-4 py-2">
                          Acciones
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users?.data.map((user) => (
                        <TableRow key={user.id} className="border-b">
                          <TableCell className="px-4 py-2">
                            {user.username}
                          </TableCell>
                          <TableCell className="px-4 py-2">
                            {user.name}
                          </TableCell>
                          <TableCell className="px-4 py-2">
                            {user.lastname}
                          </TableCell>
                          <TableCell className="px-4 py-2">
                            <Badge
                              variant={getRoleBadgeVariant(user.role.name)}
                              className="text-xs px-2 py-1 whitespace-nowrap"
                            >
                              {getRoleName(user.role.name)}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-4 py-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  disabled={disabledBtn}
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={`${
                                    profile?.id === user.id && 'hidden'
                                  }`}
                                  disabled={disabledBtn}
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Anterior
                  </Button>

                  <span>
                    Página {currentPage} de {totalPages} | Total usuarios:{' '}
                    {totalUsers}
                  </span>

                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    variant="outline"
                  >
                    Siguiente
                  </Button>
                </div>

                <div className="flex justify-end mt-4 items-center">
                  <span className="mr-2">Mostrar:</span>
                  <Select
                    onValueChange={handlePageSizeChange}
                    value={String(pageSize)}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
