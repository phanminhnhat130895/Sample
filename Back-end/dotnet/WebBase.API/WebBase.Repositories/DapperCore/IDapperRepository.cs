using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Text;
using static Dapper.SqlMapper;

namespace WebBase.Repositories.DapperCore
{
    public interface IDapperRepository
    {
        /// <summary>
        /// open connection
        /// </summary>
        void OpenConnection();

        /// <summary>
        /// close connection
        /// </summary>
        void CloseConnection();

        /// <summary>
        /// begin transaction
        /// </summary>
        void BeginTransaction();

        /// <summary>
        /// commit transaction
        /// </summary>
        void CommitTransaction();

        /// <summary>
        /// rollback transaction
        /// </summary>
        void RollbackTransaction();

        /// <summary>
        /// execute reader
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        IDataReader ExecuteReader(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute data table
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        DataTable ExecuteDataTable(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute non query
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        int ExecuteNonQuery(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute scalar
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        object ExecuteScalar(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute for list
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        IEnumerable<T> ExecuteForList<T>(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute for info
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        T ExecuteForInfo<T>(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        /// <summary>
        /// execute for multi
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        GridReader ExecuteForMulti(string sql, object parameters = null, CommandType commandType = CommandType.StoredProcedure);

        // Use dapper annotation when use region below
        #region Dapper Contrib
        /// <summary>
        /// get single
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        T GetSingle<T>(Expression<Func<T, bool>> predicate) where T : class;

        /// <summary>
        /// get all
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        IEnumerable<T> GetAll<T>() where T : class;

        /// <summary>
        /// insert one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        long InsertOne<T>(T model) where T : class;

        /// <summary>
        /// insert multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="models"></param>
        /// <returns></returns>
        long InsertMulti<T>(List<T> models) where T : class;

        /// <summary>
        /// update one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        bool UpdateOne<T>(T model) where T : class;

        /// <summary>
        /// update multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="models"></param>
        /// <returns></returns>
        bool UpdateMulti<T>(List<T> models) where T : class;

        /// <summary>
        /// delete one
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="model"></param>
        /// <returns></returns>
        bool DeleteOne<T>(T model) where T : class;

        /// <summary>
        /// delete multi
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="models"></param>
        /// <returns></returns>
        bool DeleteMulti<T>(List<T> models) where T : class;
        #endregion
    }
}
