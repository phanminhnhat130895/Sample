using Dapper;
using Dapper.Contrib.Extensions;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using static Dapper.SqlMapper;

namespace WebBase.Repositories.DapperCore
{
    public class DapperRepository : IDapperRepository, IDisposable
    {
        private string _connectionString = null;
        public MySqlTransaction Transaction { get; private set; } = null;
        public MySqlConnection Connection { get; private set; } = null;
        private int CommandTimeout = 3600;

        public DapperRepository(string connectionString)
        {
            _connectionString = connectionString;
            Connection = new MySqlConnection(_connectionString);
        }

        /// <summary>
        /// open connection
        /// </summary>
        public void OpenConnection()
        {
            if (Connection.State == ConnectionState.Closed) Connection.Open();
        }

        /// <summary>
        /// close connection
        /// </summary>
        public void CloseConnection()
        {
            if (Connection.State == ConnectionState.Open) Connection.Close();
        }

        /// <summary>
        /// begin transaction
        /// </summary>
        public void BeginTransaction()
        {
            if (Connection != null && Connection.State == ConnectionState.Open) Transaction = Connection.BeginTransaction();
        }

        /// <summary>
        /// commit transaction
        /// </summary>
        public void CommitTransaction()
        {
            if (Transaction != null)
            {
                Transaction.Commit();
                Transaction = null;
            }
        }

        /// <summary>
        /// rollback transaction
        /// </summary>
        public void RollbackTransaction()
        {
            if(Transaction != null)
            {
                Transaction.Rollback();
                Transaction = null;
            }
        }

        /// <summary>
        /// execute reader
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public IDataReader ExecuteReader(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.ExecuteReader(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if(Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute datatable
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public DataTable ExecuteDataTable(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                DataTable table = new DataTable();
                OpenConnection();

                IDataReader reader = Connection.ExecuteReader(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);

                table.Load(reader);
                return table;
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute non query
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public int ExecuteNonQuery(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.Execute(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute scalar
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public object ExecuteScalar(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.ExecuteScalar(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute for list
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public IEnumerable<T> ExecuteForList<T>(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.Query<T>(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute for info
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public T ExecuteForInfo<T>(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.QueryFirstOrDefault<T>(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// execute for multi
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        public GridReader ExecuteForMulti(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure)
        {
            try
            {
                OpenConnection();

                return Connection.QueryMultiple(sql, parameters, commandTimeout: CommandTimeout, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// get single
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public T GetSingle<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            try
            {
                OpenConnection();

                var list = Connection.GetAll<T>().AsQueryable();

                return list.Where(predicate).SingleOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// get all
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public IEnumerable<T> GetAll<T>() where T : class
        {
            try
            {
                OpenConnection();

                return Connection.GetAll<T>();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// insert one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public long InsertOne<T>(T model) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Insert<T>(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// insert multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="models"></param>
        /// <returns></returns>
        public long InsertMulti<T>(List<T> models) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Insert<List<T>>(models);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// update one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateOne<T>(T model) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Update(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// update multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="models"></param>
        /// <returns></returns>
        public bool UpdateMulti<T>(List<T> models) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Update(models);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// delete one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool DeleteOne<T>(T model) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Delete(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// delete multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool DeleteMulti<T>(List<T> models) where T : class
        {
            try
            {
                OpenConnection();

                return Connection.Delete(models);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (Connection != null) CloseConnection();
            }
        }

        /// <summary>
        /// dispose
        /// </summary>
        public void Dispose()
        {
            if (Connection != null)
            {
                if (Connection.State == ConnectionState.Open)
                    Connection.Close();
                Connection.Dispose();
            }
        }
    }
}
